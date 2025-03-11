import {
  redis
} from "./chunk-J4J5D7M7.mjs";

// src/functions/access-invite-link.ts
async function accessInviteLink({
  subscriberId
}) {
  redis.hincrby("referral:access-count", subscriberId, 1);
}

export {
  accessInviteLink
};
