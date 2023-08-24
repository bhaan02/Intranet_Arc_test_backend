import { config } from 'dotenv';
import passport from 'passport';
import { Strategy as MicrosoftStrategy } from "passport-microsoft";

config();

passport.use(
    "auth-microsoft", 
    new MicrosoftStrategy({
        clientID: "70a483d8-9652-401a-8b64-e47d0a6a8173",
        clientSecret: "WLF8Q~05kl_LRKX5jWUDUSBAuwphPj3sNoipqcsd",
        callbackURL: "http://localhost:3000/auth/microsoft/callback",
        scope: ["user.read","mail.read","calendars.read","offline_access"],
        authorizationURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    function (accessToken, refreshToken, profile, done) {

        console.log(profile)
        done(null, profile)

        return(profile)
    }
))

