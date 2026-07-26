import { auth as authOptions } from "./options"
import { cache } from "react"

export const { auth: uncachedAuth, signIn, signOut, handlers } = authOptions

export const auth = cache(uncachedAuth)
