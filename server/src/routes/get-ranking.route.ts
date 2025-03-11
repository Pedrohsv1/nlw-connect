import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  // GET /ranking
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        tags: ['referral'],
        description:
          'This endpoint allows users to get the ranking position of a subscriber. Upon successful access, it returns the ranking position of the subscriber.',
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                subscriberId: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { rankingWithScore } = await getRanking()

      return reply.status(200).send({ ranking: rankingWithScore })
    }
  )
}
