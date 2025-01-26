declare module "react-syntax-highlighter" {
  import * as React from "react"
  export const Prism: React.ComponentType<{
    style: any
    language: string
    PreTag?: string
    children: React.ReactNode
    [key: string]: any
  }>
}
