import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';

import Models from '../../../models';

export default (req, res) => NextAuth(req, res, {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user user:email'
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],

  // debug: process.env.NODE_ENV === 'development',

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },

  adapter: Adapters.TypeORM.Adapter({
    url: process.env.DATABASE_URL,
    type: 'postgres'
  }, {
    models: {
      User: Models.User
    }
  }),
});