export interface MinecraftServersApiResponse {
  online: boolean | string;
  host: string;
  port: number;
  ip_address?: string;
  eula_blocked?: boolean;
  retrieved_at?: number;
  expires_at?: number;
  srv_record?: any;
}
