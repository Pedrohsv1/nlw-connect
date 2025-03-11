import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  // POST /subscriptions
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirect to the subscribe page',
        tags: ['referral'],
        description:
          'This endpoint allows users to access the invite link and redirect to the subscribe page. Upon successful access, it redirects to the subscribe page with the subscriberId as a query parameter.',
        params: z.object({
          subscriberId: z.string(),
        }),

        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      // Create the invite link page URL -> WEB_URL?subscriberId=123
      const inviteLinkPage = new URL(env.WEB_URL)
      inviteLinkPage.searchParams.append('referrer', subscriberId)

      // 301: Moved Permanently
      // 302: Temporary Redirect

      return reply.redirect(inviteLinkPage.toString(), 302)
    }
  )
}
