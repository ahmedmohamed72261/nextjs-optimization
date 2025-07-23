"use client"

import { Provider } from "react-redux"
import { makeStore } from "@/lib/redux/store"
import type { ReactNode } from "react"

const store = makeStore()

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
