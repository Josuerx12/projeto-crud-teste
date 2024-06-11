import { db } from "@/config/db";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "@/interfaces/User";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Login Credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email) {
          throw new Error("E-mail é obrigatorio!");
        } else if (!credentials.password) {
          throw new Error("Senha é obrigatoria!");
        }

        const existsUser = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existsUser) {
          throw new Error(`Nenhum usuário cadastrado no e-mail informado!`);
        }

        const verifiedUser = await bcrypt.compare(
          credentials.password,
          existsUser.password
        );

        if (!verifiedUser) {
          throw new Error("Credenciais invalidas!");
        }

        const user = await db.user.findUnique({
          where: {
            id: existsUser.id,
          },
          select: {
            avatar: true,
            firstName: true,
            lastName: true,
            email: true,
            id: true,
          },
        });

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      // Adicionar informações do token à sessão
      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
