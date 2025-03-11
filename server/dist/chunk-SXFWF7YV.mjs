import {
  db
} from "./chunk-PNV6U232.mjs";
import {
  subscriptions
} from "./chunk-5OAAD53O.mjs";
import {
  redis
} from "./chunk-J4J5D7M7.mjs";

// src/functions/get-ranking.ts
import { inArray } from "drizzle-orm";
async function getRanking() {
  const rank = await redis.zrevrange("referral:ranking", 0, 2, "WITHSCORES");
  const subscriberIdAndScore = {};
  for (let i = 0; i < rank.length; i += 2) {
    subscriberIdAndScore[rank[i]] = Number.parseInt(rank[i + 1]);
  }
  const subscribers = await db.select().from(subscriptions).where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)));
  const rankingWithScore = subscribers.map((subscriber) => ({
    subscriberId: subscriber.id,
    name: subscriber.name,
    score: subscriberIdAndScore[subscriber.id]
  })).sort((a, b) => b.score - a.score);
  return { rankingWithScore };
}

export {
  getRanking
};
