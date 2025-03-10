type MinecraftServerStatusResponse =
  | MinecraftServerOnlineStatus
  | MinecraftServerOfflineStatus;

interface MinecraftServerOnlineStatus {
  online: boolean;
  ip: string;
  port: number;
  hostname?: string; // Optional as it's only included when a hostname is detected
  debug: DebugInfo;
  version: string;
  protocol?: ProtocolInfo; // Optional as it's only included when ping is used
  icon?: string; // Optional as it's only included when an icon is detected
  software?: string; // Optional as it's only included when software is detected
  map: TextContent;
  gamemode?: string; // Optional as it's only included for Bedrock servers
  serverid?: string; // Optional as it's only included for Bedrock servers
  eula_blocked?: boolean; // Optional as it's only included for Java servers
  motd: MotdContent;
  players: PlayerInfo;
  plugins?: PluginInfo[]; // Optional as it's only included when plugins are detected
  mods?: ModInfo[]; // Optional as it's only included when mods are detected
  info?: InfoContent; // Optional as it's only included when player samples are used for information
}

interface MinecraftServerOfflineStatus {
  online: false;
  ip: string | "";
  port: number | null;
  hostname?: string;
  debug: DebugInfo;
}

interface DebugInfo {
  ping: boolean;
  query: boolean;
  bedrock: boolean;
  srv: boolean;
  querymismatch: boolean;
  ipinsrv: boolean;
  cnameinsrv: boolean;
  animatedmotd: boolean;
  cachehit: boolean;
  cachetime: number;
  cacheexpire: number;
  apiversion: number;
}

interface ProtocolInfo {
  version: number;
  name?: string; // Optional as it's only included if a version name is found
}

interface TextContent {
  raw: string;
  clean: string;
  html: string;
}

interface MotdContent {
  raw: string[];
  clean: string[];
  html: string[];
}

interface PlayerInfo {
  online: number;
  max: number;
  list?: PlayerData[]; // Optional as it's only included when there are players
}

interface PlayerData {
  name: string;
  uuid: string;
}

interface PluginInfo {
  name: string;
  version: string;
}

interface ModInfo {
  name: string;
  version: string;
}

interface InfoContent {
  raw: string[];
  clean: string[];
  html: string[];
}

export type {
  MinecraftServerStatusResponse,
  MinecraftServerOnlineStatus,
  MinecraftServerOfflineStatus,
  DebugInfo,
  ProtocolInfo,
  TextContent,
  MotdContent,
  PlayerInfo,
  PlayerData,
  PluginInfo,
  ModInfo,
  InfoContent,
};
