import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    // GET /subscriber/:subscriberId/ranking/count
    app.get(
      '/subscriber/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscriber invite count',
          tags: ['referral'],
          description:
            'This endpoint allows users to get the invite count of a subscriber. Upon successful access, it returns the count of invites for the subscriber.',
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesCount({ subscriberId })

        return reply.status(200).send({
          count,
        })
      }
    )
  }
