import {
  getSubscriberInvitesCount
} from "./chunk-5G3UUU6T.mjs";

// src/routes/get-subscriber-invites-count.route.ts
import z from "zod";
var getSubscriberInvitesCountRoute = async (app) => {
  app.get(
    "/subscriber/:subscriberId/ranking/count",
    {
      schema: {
        summary: "Get subscriber invite count",
        tags: ["referral"],
        description: "This endpoint allows users to get the invite count of a subscriber. Upon successful access, it returns the count of invites for the subscriber.",
        params: z.object({
          subscriberId: z.string()
        }),
        response: {
          200: z.object({
            count: z.number()
          })
        }
      }
    },
    async (request, reply) => {
      const { subscriberId } = request.params;
      const { count } = await getSubscriberInvitesCount({ subscriberId });
      return reply.status(200).send({
        count
      });
    }
  );
};

export {
  getSubscriberInvitesCountRoute
};
