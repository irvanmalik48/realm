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
    if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
      return p;
    }
  }
  return path.join(process.cwd(), "src", "proto", "realm", "v1");
}

export type DynamicGrpcClient = grpc.Client & Record<string, unknown>;

const cachedClients: {
  health?: DynamicGrpcClient;
  auth?: DynamicGrpcClient;
  contact?: DynamicGrpcClient;
  lastfm?: DynamicGrpcClient;
  storage?: DynamicGrpcClient;
  reaction?: DynamicGrpcClient;
  comment?: DynamicGrpcClient;
} = {};

interface ProtoPackage {
  realm: {
    v1: Record<string, grpc.ServiceClientConstructor>;
  };
}

function createClient(protoFile: string, serviceName: string): DynamicGrpcClient {
  const filePath = path.join(/*turbopackIgnore: true*/ getProtoDir(), protoFile);
  const packageDef = protoLoader.loadSync(filePath, protoOptions);
  const proto = grpc.loadPackageDefinition(packageDef) as unknown as ProtoPackage;
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

  const channelOptions: grpc.ChannelOptions = {
    "grpc.keepalive_time_ms": 30000,
    "grpc.keepalive_timeout_ms": 10000,
    "grpc.keepalive_permit_without_calls": 1,
    "grpc.http2.min_time_between_pings_ms": 10000,
    "grpc.http2.max_pings_without_data": 0,
  };

  return new ServiceConstructor(target, credentials, channelOptions);
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
  client: DynamicGrpcClient,
  methodName: string,
  request: TReq,
  metadata: grpc.Metadata = new grpc.Metadata()
): Promise<TRes> {
  return new Promise((resolve, reject) => {
    const fn = client[methodName] as (
      req: TReq,
      meta: grpc.Metadata,
      cb: (err: grpc.ServiceError | null, response: TRes) => void
    ) => void;
    fn.call(client, request, metadata, (err: grpc.ServiceError | null, response: TRes) => {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
}
