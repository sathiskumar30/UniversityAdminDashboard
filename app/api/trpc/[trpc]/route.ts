import { initTRPC, TRPCError } from "@trpc/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { z } from "zod"
import { UNIVERSITIES_DATA } from "../../../lib/constants"

const t = initTRPC.create()

const appRouter = t.router({
  test: t.procedure.query(() => {
    console.log("tRPC: Test endpoint called")
    return { message: "tRPC is working!", timestamp: new Date().toISOString() }
  }),

  getUniversities: t.procedure.query(() => {
    console.log("tRPC: Getting all universities")
    return UNIVERSITIES_DATA
  }),

  getUniversity: t.procedure.input(z.object({ id: z.number() })).query(({ input }) => {
    console.log("tRPC: Getting university with id:", input.id)
    const university = UNIVERSITIES_DATA.find((u) => u.id === input.id)
    if (!university) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `University with id ${input.id} not found`,
      })
    }
    return university
  }),
})

export type AppRouter = typeof appRouter

const handler = (req: Request) => {
  console.log("tRPC: Request received:", req.method, req.url)
  
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: ({ error }) => {
      console.error("tRPC Error:", error)
    },
  })
}

export { handler as GET, handler as POST } 