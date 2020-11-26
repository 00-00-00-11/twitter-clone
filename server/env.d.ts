declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: number;
    MONGODB_URI?: string;
    CLIENT_URL?: string;
    JWT_SECRET?: string;
  }
}
