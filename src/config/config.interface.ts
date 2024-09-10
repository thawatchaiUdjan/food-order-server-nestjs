export interface DatabaseConfig {
  host: string;
}

export interface GoogleConfig {
  clientId: string;
  secretId: string;
  redirectUrl: string;
}

export interface FacebookConfig {
  clientId: string;
  secretId: string;
}

export interface TokenConfig {
  tokenExpiredError: string;
  tokenExpiredTime: string;
}

export interface AppConfig {
  port: number;
  jwtSecret: string;
  database: DatabaseConfig;
  google: GoogleConfig;
  facebook: FacebookConfig;
  encryptSaltRounds: number;
  token: TokenConfig;
}
