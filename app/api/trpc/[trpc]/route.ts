import { initTRPC, TRPCError } from "@trpc/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { z } from "zod"
import { dbQueries } from "../../../lib/database"

const t = initTRPC.create()

const appRouter = t.router({
  test: t.procedure.query(() => {
    console.log("tRPC: Test endpoint called")
    return { message: "tRPC is working!", timestamp: new Date().toISOString() }
  }),

  getUniversities: t.procedure.query(() => {
    console.log("tRPC: Getting all universities")
    const universities = dbQueries.getAllUniversities()
    return universities.map((uni: any) => ({
      id: uni.id,
      name: uni.name,
      shortName: uni.shortName,
      city: uni.city,
      province: uni.province,
      country: uni.country,
      logoUrl: uni.logoUrl,
      rankings: {
        worldRank: uni.worldRank,
        nationalRank: uni.nationalRank,
        quebecRank: uni.quebecRank
      }
    }))
  }),

  getUniversity: t.procedure.input(z.object({ id: z.number() })).query(({ input }) => {
    console.log("tRPC: Getting university with id:", input.id)
    const university = dbQueries.getUniversityById(input.id)
    if (!university) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `University with id ${input.id} not found`,
      })
    }
    
    // Transform the data to match frontend expectations
    return {
      ...university,
      keyFacts: (() => {
        try {
          return (university as any).keyFacts ? JSON.parse((university as any).keyFacts) : []
        } catch {
          return []
        }
      })(),
      rankings: {
        worldRank: (university as any).worldRank,
        nationalRank: (university as any).nationalRank,
        quebecRank: (university as any).quebecRank
      },
      contact: {
        address: (university as any).address,
        phone: (university as any).phone,
        email: (university as any).email
      },
      socialMedia: {
        twitter: (university as any).twitter,
        linkedin: (university as any).linkedin,
        facebook: (university as any).facebook,
        instagram: (university as any).instagram
      }
    }
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