
import nextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
    secret: process.env.JWT_SECRET_KEY,
    providers: [
        Credentials({
            name: 'credentials',
            credentials:{
                email:{ label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize (credentials){
                
                const response = await fetch('http://localhost:3000/api/auth/login',{
                    method: 'POST',
                    headers:{
                        'Content-type': 'application/json',
                         
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })
                const user = await response.json()
                console.log(user)

                if(user && response.ok){
                    return user;
                }
                return null;
            }
        })
    ],
    pages:{
        signIn:'/'
    },
    callbacks: {
        async jwt({token, user}){
            user && (token.user = user)
            return token
        },
        async session({session, token}) {
           session = token.user as any 
           return session
        },
    }
}

const handle = nextAuth(nextAuthOptions)

export {handle as GET, handle as POST, nextAuthOptions}