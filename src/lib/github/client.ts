import "server-only";
import { graphql, GraphqlResponseError } from "@octokit/graphql";
import { env } from "@/env";

export class GitHubApiError extends Error {
  code: "NO_TOKEN" | "RATE_LIMITED" | "NOT_FOUND" | "GRAPHQL_ERROR" | "UNKNOWN";
  status?: number;

  constructor(
    message: string,
    code: "NO_TOKEN" | "RATE_LIMITED" | "NOT_FOUND" | "GRAPHQL_ERROR" | "UNKNOWN" = "UNKNOWN",
    status?: number
  ) {
    super(message);
    this.name = "GitHubApiError";
    this.code = code;
    this.status = status;
  }
}

/**
 * Returns a configured @octokit/graphql client instance with server authentication.
 */
export function getGitHubGraphQLClient() {
  const token = env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  return graphql.defaults({
    headers: {
      authorization: `bearer ${token}`,
      "user-agent": "realm-app/1.0",
    },
  });
}

/**
 * Safely executes a GitHub GraphQL query with authentication, typed response,
 * and structured error handling.
 */
export async function executeGitHubGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const client = getGitHubGraphQLClient();

  if (!client) {
    throw new GitHubApiError(
      "GitHub personal access token (GITHUB_TOKEN) is not configured in environment variables.",
      "NO_TOKEN"
    );
  }

  try {
    const data = await client<T>(query, variables);
    return data;
  } catch (error) {
    if (error instanceof GraphqlResponseError) {
      const isRateLimited = error.errors?.some(
        (e) =>
          e.message.toLowerCase().includes("rate limit") ||
          e.type === "RATE_LIMITED"
      );

      if (isRateLimited) {
        throw new GitHubApiError(
          "GitHub API rate limit exceeded.",
          "RATE_LIMITED",
          429
        );
      }

      const isNotFound = error.errors?.some(
        (e) =>
          e.type === "NOT_FOUND" ||
          e.message.toLowerCase().includes("could not resolve to a user")
      );

      if (isNotFound) {
        throw new GitHubApiError(
          `GitHub user not found or resource does not exist.`,
          "NOT_FOUND",
          404
        );
      }

      const message = error.errors?.map((e) => e.message).join("; ") || error.message;
      throw new GitHubApiError(message, "GRAPHQL_ERROR", 400);
    }

    if (error instanceof Error) {
      throw new GitHubApiError(error.message, "UNKNOWN");
    }

    throw new GitHubApiError("An unexpected error occurred while querying GitHub API.", "UNKNOWN");
  }
}
