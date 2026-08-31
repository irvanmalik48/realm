import { status as grpcStatus } from "@grpc/grpc-js";

export function grpcStatusToHttpStatus(code?: number): number {
  switch (code) {
    case grpcStatus.OK:
      return 200;
    case grpcStatus.INVALID_ARGUMENT:
    case grpcStatus.FAILED_PRECONDITION:
    case grpcStatus.OUT_OF_RANGE:
      return 400;
    case grpcStatus.UNAUTHENTICATED:
      return 401;
    case grpcStatus.PERMISSION_DENIED:
      return 403;
    case grpcStatus.NOT_FOUND:
      return 404;
    case grpcStatus.ALREADY_EXISTS:
    case grpcStatus.ABORTED:
      return 409;
    case grpcStatus.RESOURCE_EXHAUSTED:
      return 429;
    case grpcStatus.UNIMPLEMENTED:
      return 501;
    case grpcStatus.UNAVAILABLE:
      return 503;
    case grpcStatus.DEADLINE_EXCEEDED:
      return 504;
    default:
      return 500;
  }
}

export function formatGrpcError(err: any): { message: string; status: number } {
  const httpStatus = grpcStatusToHttpStatus(err?.code);
  const message = err?.details || err?.message || "Internal server error";
  return { message, status: httpStatus };
}
