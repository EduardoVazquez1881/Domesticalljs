import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma"; // Asegúrate de que Prisma esté configurado
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);

        const userFound = await prisma.USER.findUnique({
          where: {
            email: credentials.email
          }
        });

        if(!userFound) throw new Error("User not found")

        console.log("El error es",userFound)

        const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

        if(!matchPassword) throw new Error("Password incorrect");

        return{
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        }
      },
    }),
  ]};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
