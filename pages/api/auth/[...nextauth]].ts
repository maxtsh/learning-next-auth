import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export type UserType = { id: number; email: string; password: string };

// Sample of an AUTH user
const authUser = {
  id: 1,
  email: "tatshahdoost@gmail.com",
  password: "12345678",
};

const auth = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@yourhost.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (
        credentials: Record<string, string> | undefined
      ): Promise<UserType> => {
        const req: Promise<UserType> = new Promise((res, rej) => {
          const user =
            credentials?.email === authUser.email &&
            credentials?.password === authUser.password
              ? authUser
              : null;
          setTimeout(() => {
            if (user) {
              res(user);
            } else {
              rej(new Error("INVALID CREDENTIALS"));
            }
          }, 2000);
        });
        try {
          const user: UserType = await req;
          return user;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
});

export default auth;
