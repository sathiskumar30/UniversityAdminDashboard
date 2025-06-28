import { initTRPC } from "@trpc/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { z } from "zod"
import { getUniversity, getRankings, getAchievements, getOverallRankings, getSubjectRankings } from "../../lib/db"

const t = initTRPC.create()

const appRouter = t.router({
  getUniversity: t.procedure.input(z.object({ id: z.number() })).query(({ input }) => {
    console.log("tRPC: Getting university with id:", input.id)
    const university = getUniversity(input.id)
    console.log("tRPC: Returning university:", university)
    return university
  }),

  getRankings: t.procedure.input(z.object({ universityId: z.number() })).query(({ input }) => {
    console.log("tRPC: Getting all rankings for university id:", input.universityId)
    const rankings = getRankings(input.universityId)
    console.log("tRPC: Returning all rankings:", rankings)
    return rankings
  }),

  getOverallRankings: t.procedure.input(z.object({ universityId: z.number() })).query(({ input }) => {
    console.log("tRPC: Getting overall rankings for university id:", input.universityId)
    const rankings = getOverallRankings(input.universityId)
    console.log("tRPC: Returning overall rankings:", rankings)
    return rankings
  }),

  getSubjectRankings: t.procedure.input(z.object({ universityId: z.number() })).query(({ input }) => {
    console.log("tRPC: Getting subject rankings for university id:", input.universityId)
    const rankings = getSubjectRankings(input.universityId)
    console.log("tRPC: Returning subject rankings:", rankings)
    return rankings
  }),

  getAchievements: t.procedure.input(z.object({ universityId: z.number() })).query(({ input }) => {
    console.log("tRPC: Getting achievements for university id:", input.universityId)
    const achievements = getAchievements(input.universityId)
    console.log("tRPC: Returning achievements:", achievements)
    return achievements
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
