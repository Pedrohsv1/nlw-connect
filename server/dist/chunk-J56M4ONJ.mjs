import {
  getSubscriberRankingPosition
} from "./chunk-IHJHN5JD.mjs";

// src/routes/get-subscriber-ranking-position.route.ts
import z from "zod";
var getSubscriberRankingPositionRoute = async (app) => {
  app.get(
    "/subscriber/:subscriberId/ranking/position",
    {
      schema: {
        summary: "Get subscriber ranking position",
        tags: ["referral"],
        description: "This endpoint allows users to get the ranking position of a subscriber. Upon successful access, it returns the ranking position of the subscriber.",
        params: z.object({
          subscriberId: z.string()
        }),
        response: {
          200: z.object({
            position: z.number().nullable()
          })
        }
      }
    },
    async (request, reply) => {
      const { subscriberId } = request.params;
      const { position } = await getSubscriberRankingPosition({
        subscriberId
      });
      return reply.status(200).send({
        position
      });
    }
  );
};

export {
  getSubscriberRankingPositionRoute
};
