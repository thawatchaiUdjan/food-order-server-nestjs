import { Injectable } from '@nestjs/common';
import { ConfigService as AppConfigService } from '@nestjs/config';
import {
  AppConfig,
  DatabaseConfig,
  FacebookConfig,
  GoogleConfig,
  TokenConfig,
} from './config.interface';

@Injectable()
export class ConfigService {
  private readonly config: AppConfig;

  constructor(private readonly appConfigService: AppConfigService) {
    this.config = this.appConfigService.get<AppConfig>('appConfig');
  }

  get port(): number {
    return this.config.port;
  }

  get jwtSecret(): string {
    return this.config.jwtSecret;
  }

  get database(): DatabaseConfig {
    return this.config.database;
  }

  get google(): GoogleConfig {
    return this.config.google;
  }

  get facebook(): FacebookConfig {
    return this.config.facebook;
  }

  get encryptSaltRounds(): number {
    return this.config.encryptSaltRounds;
  }

  get token(): TokenConfig {
    return this.config.token;
  }
}
