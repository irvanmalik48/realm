export interface SystemInfo {
  cpu: {
    model: string;
    utilisation: number;
    temperatures: any[];
    frequencies: {
      [key: string]: {
        now: number | null;
        min: number | null;
        base: number | null;
        max: number | null;
      };
    };
    count: number;
    cache: number;
    cores: number;
  };
  memory: {
    total: number;
    available: number;
    cached: number;
    swap_total: number;
    swap_available: number;
    processes: number;
  };
  storage: {
    [key: string]: {
      icon: string;
      total: number;
      available: number;
    };
  };
  network: {
    interface: string;
    speed: number;
    rx: number;
    tx: number;
  };
  host: {
    uptime: number;
    os: string;
    hostname: string;
    app_memory: string;
    loadavg: number[];
  };
}
