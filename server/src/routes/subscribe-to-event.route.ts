import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

const subscriptionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  referrer: z.string().nullish(),
})

export const SubscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  // POST /subscriptions
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to event',
        tags: ['subscriptions'],
        description:
          'This endpoint allows users to subscribe to an event by sending their name and email in the request body. Upon successful subscription, it returns the name and email of the subscriber.',
        body: subscriptionSchema,
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })

      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
