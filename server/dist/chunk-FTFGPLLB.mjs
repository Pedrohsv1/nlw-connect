import {
  redis
} from "./chunk-J4J5D7M7.mjs";

// src/functions/get-subscriber-invite-clicks.ts
async function getSubscriberInviteClicks({
  subscriberId
}) {
  const count = await redis.hget("referral:access-count", subscriberId);
  return {
    count: count ? Number.parseInt(count) : 0
  };
}

export {
  getSubscriberInviteClicks
};
