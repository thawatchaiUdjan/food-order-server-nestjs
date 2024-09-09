import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as passport from 'passport';
import * as FacebookTokenStrategy from 'passport-facebook-token';

@Injectable()
export class FacebookStrategy {
  constructor(private readonly config: ConfigService) {
    this.init();
  }

  init() {
    passport.use(
      new FacebookTokenStrategy(
        {
          clientID: this.config.get<string>('facebook.clientId'),
          clientSecret: this.config.get<string>('facebook.secretId'),
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          try {
            return done(null, profile);
          } catch (err) {
            return done(err, false);
          }
        },
      ),
    );
  }
}
