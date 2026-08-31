import fs from "fs";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { env } from "@/env";

export function getGrpcTarget(): string {
  if (env.GRPC_API_URL) return env.GRPC_API_URL;
  if (process.env.GRPC_API_URL) return process.env.GRPC_API_URL;
  return process.env.NODE_ENV === "development"
    ? "127.0.0.1:50051"
    : "realm-api:50051";
}

const protoOptions: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

function getProtoDir(): string {
  const possiblePaths = [
    path.join(process.cwd(), "src", "proto", "realm", "v1"),
    path.join(__dirname, "src", "proto", "realm", "v1"),
    path.join(process.cwd(), "proto", "realm", "v1"),
    path.resolve("./src/proto/realm/v1"),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return path.join(process.cwd(), "src", "proto", "realm", "v1");
}

let cachedClients: {
  health?: any;
  auth?: any;
  contact?: any;
  lastfm?: any;
  storage?: any;
  reaction?: any;
  comment?: any;
} = {};

function createClient(protoFile: string, serviceName: string) {
  const filePath = path.join(getProtoDir(), protoFile);
  const packageDef = protoLoader.loadSync(filePath, protoOptions);
  const proto = grpc.loadPackageDefinition(packageDef) as any;
  const ServiceConstructor = proto.realm.v1[serviceName];
  if (!ServiceConstructor) {
    throw new Error(`Service ${serviceName} not found in ${protoFile}`);
  }
  const rawTarget = getGrpcTarget().trim();
  const isSecure =
    rawTarget.startsWith("https://") ||
    rawTarget.endsWith(":443") ||
    (!rawTarget.includes(":") &&
      !rawTarget.includes("localhost") &&
      !rawTarget.includes("127.0.0.1") &&
      !rawTarget.includes("realm-api"));

  const target = rawTarget.replace(/^https?:\/\//, "");
  const credentials = isSecure
    ? grpc.credentials.createSsl()
    : grpc.credentials.createInsecure();

  return new ServiceConstructor(target, credentials);
}

export function getHealthClient() {
  if (!cachedClients.health) {
    cachedClients.health = createClient("health.proto", "HealthService");
  }
  return cachedClients.health;
}

export function getAuthClient() {
  if (!cachedClients.auth) {
    cachedClients.auth = createClient("auth.proto", "AuthService");
  }
  return cachedClients.auth;
}

export function getContactClient() {
  if (!cachedClients.contact) {
    cachedClients.contact = createClient("contact.proto", "ContactService");
  }
  return cachedClients.contact;
}

export function getLastFMClient() {
  if (!cachedClients.lastfm) {
    cachedClients.lastfm = createClient("lastfm.proto", "LastFMService");
  }
  return cachedClients.lastfm;
}

export function getStorageClient() {
  if (!cachedClients.storage) {
    cachedClients.storage = createClient("storage.proto", "StorageService");
  }
  return cachedClients.storage;
}

export function getReactionClient() {
  if (!cachedClients.reaction) {
    cachedClients.reaction = createClient("reaction.proto", "ReactionService");
  }
  return cachedClients.reaction;
}

export function getCommentClient() {
  if (!cachedClients.comment) {
    cachedClients.comment = createClient("comment.proto", "CommentService");
  }
  return cachedClients.comment;
}

export function createMetadata(options?: {
  token?: string | null;
  apiToken?: string | null;
  ip?: string;
  userAgent?: string;
}): grpc.Metadata {
  const metadata = new grpc.Metadata();
  if (options?.token) {
    metadata.set("authorization", `Bearer ${options.token}`);
  } else if (options?.apiToken || env.API_TOKEN) {
    metadata.set("authorization", `Bearer ${options?.apiToken || env.API_TOKEN}`);
  }
  if (options?.ip) {
    metadata.set("x-forwarded-for", options.ip);
  }
  if (options?.userAgent) {
    metadata.set("user-agent", options.userAgent);
  }
  return metadata;
}

export function promisifyUnary<TReq, TRes>(
  client: any,
  methodName: string,
  request: TReq,
  metadata: grpc.Metadata = new grpc.Metadata()
): Promise<TRes> {
  return new Promise((resolve, reject) => {
    client[methodName](request, metadata, (err: grpc.ServiceError | null, response: TRes) => {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
}
