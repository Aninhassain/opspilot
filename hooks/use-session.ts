"use client"

import { auth } from "@/auth/lib/react"
import { useEffect, useState } from "react"

export function useSession() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth().then((data) => {
      setSession(data)
      setLoading(false)
    })
  }, [])

  return { data: session, loading }
}
