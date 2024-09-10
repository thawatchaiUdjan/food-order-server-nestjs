import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as AppConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Global()
@Module({
  imports: [AppConfigModule.forRoot({ load: [configuration] })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
