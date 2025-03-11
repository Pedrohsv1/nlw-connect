import {
  subscribeToEvent
} from "./chunk-ZS7UYH6L.mjs";

// src/routes/subscribe-to-event.route.ts
import z from "zod";
var subscriptionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  referrer: z.string().nullish()
});
var SubscribeToEventRoute = async (app) => {
  app.post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscribe to event",
        tags: ["subscriptions"],
        description: "This endpoint allows users to subscribe to an event by sending their name and email in the request body. Upon successful subscription, it returns the name and email of the subscriber.",
        body: subscriptionSchema,
        response: {
          201: z.object({
            subscriberId: z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body;
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer
      });
      return reply.status(201).send({
        subscriberId
      });
    }
  );
};

export {
  SubscribeToEventRoute
};
