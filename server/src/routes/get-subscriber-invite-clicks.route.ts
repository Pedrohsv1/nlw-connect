import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    // GET /subscriber/:subscriberId/ranking/clicks
    app.get(
      '/subscriber/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscriber invite clicks count',
          tags: ['referral'],
          description:
            'This endpoint allows users to access the invite link and redirect to the subscribe page. Upon successful access, it redirects to the subscribe page with the subscriberId as a query parameter.',
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

        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return reply.status(200).send({
          count,
        })
      }
    )
  }
