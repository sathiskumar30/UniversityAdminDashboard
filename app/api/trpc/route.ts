import { initTRPC, TRPCError } from "@trpc/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { z } from "zod"
import { dbQueries } from "../../lib/database"

const t = initTRPC.create()

const appRouter = t.router({
  getUniversities: t.procedure.query(() => {
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

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }
