import {
  accessInviteLink
} from "./chunk-PHMFNREO.mjs";
import {
  env
} from "./chunk-AUOFUMQ6.mjs";

// src/routes/access-invite-link.route.ts
import z from "zod";
var accessInviteLinkRoute = async (app) => {
  app.get(
    "/invites/:subscriberId",
    {
      schema: {
        summary: "Access invite link and redirect to the subscribe page",
        tags: ["referral"],
        description: "This endpoint allows users to access the invite link and redirect to the subscribe page. Upon successful access, it redirects to the subscribe page with the subscriberId as a query parameter.",
        params: z.object({
          subscriberId: z.string()
        }),
        response: {
          302: z.null()
        }
      }
    },
    async (request, reply) => {
      const { subscriberId } = request.params;
      await accessInviteLink({ subscriberId });
      const inviteLinkPage = new URL(env.WEB_URL);
      inviteLinkPage.searchParams.append("referrer", subscriberId);
      return reply.redirect(inviteLinkPage.toString(), 302);
    }
  );
};

export {
  accessInviteLinkRoute
};
