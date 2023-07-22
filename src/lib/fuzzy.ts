import type { Post, Project } from "~/types/definitions";

/**
 * @param query string, the query to be searched
 * @param stack string, the string in which the query will be searched
 * @returns boolean, whether the query is found in the stack
 */
export function fuzzy(query: string, stack: string) {
  const queryLength = query.length;
  const stackLength = stack.length;

  if (queryLength > stackLength) {
    return false;
  }

  if (queryLength === stackLength) {
    return query === stack;
  }

  outer: for (let i = 0, j = 0; i < queryLength; i++) {
    let q = query.charCodeAt(i);
    while (j < stackLength) {
      if (stack.charCodeAt(j++) === q) {
        continue outer;
      }
    }
    return false;
  }

  return true;
}

/**
 * @param query string, the query to be searched
 * @param stack Post[], the array of posts in which the query will be searched
 * @returns Post[], the array of posts that contains the query
 */
export function searchPost(query: string, stack: Post[]) {
  const results: Post[] = [];

  const searchVars = stack.map((result) => {
    const searchableObject = {
      key: result.permalink,
      value: `${result.title} ${result.date} ${result.desc} ${result.tags.join(" ")}`.toLowerCase(),
    }
    
    return searchableObject;
  });

  const searched = searchVars.map((searchVar) => {
    const { key, value } = searchVar;

    return fuzzy(query, value) ? key : null;
  });

  searched.forEach((searchedVar) => {
    if (searchedVar) {
      const result = stack.find((post) => post.permalink === searchedVar);
      if (result) {
        results.push(result);
      }
    }
  });

  return results;
}

export function searchProject(query: string, stack: Project[]) {
  const results: Project[] = [];

  const searchVars = stack.map((result) => {
    const searchableObject = {
      key: result.title,
      value: `${result.title} ${result.description}`.toLowerCase(),
    }
    
    return searchableObject;
  });

  const searched = searchVars.map((searchVar) => {
    const { key, value } = searchVar;

    return fuzzy(query, value) ? key : null;
  });

  searched.forEach((searchedVar) => {
    if (searchedVar) {
      const result = stack.find((project) => project.title === searchedVar);
      if (result) {
        results.push(result);
      }
    }
  });

  return results;
}