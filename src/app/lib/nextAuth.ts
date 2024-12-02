// import CredentialsProvider from "next-auth/providers/credentials"
import {type AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials"



export const authOptions:AuthOptions = {
    pages: {
        signIn: "/login", // Redirect users to your custom login page
      },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            }),

        FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID as string,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }),

        TwitterProvider({
          clientId: process.env.TWITTER_CLIENT_ID as string,
          clientSecret: process.env.TWITTER_CLIENT_SECRET as string
        }),

        CredentialsProvider({
          credentials: {
            email: {
              label: "User Name",
              placeholder: "Please enter your user Name",
              type: "text",
            },
            password: {
              label: "Password",
              placeholder: "Please enter your password",
              type: "password",
            },
          },
          // Keep `authorize` empty because you moved this logic to your login page.
          async authorize(credentials,req) {
            console.log("credentials", credentials);

          const res = await fetch(
            "https://exam.elevateegy.com/api/v1/auth/signin",
            {
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
            }
          );
          const user = await res.json();

          console.log("user data is here", user);
          if (user?.user?.email === credentials?.email) return user;
          return null;
          },
        }),
              
    ],  
};