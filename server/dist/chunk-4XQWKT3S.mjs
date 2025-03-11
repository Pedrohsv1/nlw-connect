import {
  getRanking
} from "./chunk-SXFWF7YV.mjs";

// src/routes/get-ranking.route.ts
import z from "zod";
var getRankingRoute = async (app) => {
  app.get(
    "/ranking",
    {
      schema: {
        summary: "Get ranking",
        tags: ["referral"],
        description: "This endpoint allows users to get the ranking position of a subscriber. Upon successful access, it returns the ranking position of the subscriber.",
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                subscriberId: z.string(),
                name: z.string(),
                score: z.number()
              })
            )
          })
        }
      }
    },
    async (request, reply) => {
      const { rankingWithScore } = await getRanking();
      return reply.status(200).send({ ranking: rankingWithScore });
    }
  );
};

export {
  getRankingRoute
};
