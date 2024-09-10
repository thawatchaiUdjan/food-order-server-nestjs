import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
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
          clientID: this.config.facebook.clientId,
          clientSecret: this.config.facebook.secretId,
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
