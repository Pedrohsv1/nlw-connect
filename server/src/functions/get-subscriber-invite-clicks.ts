import { redis } from '../redis/client'

interface subscribeToEventParams {
  subscriberId: string
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: subscribeToEventParams) {
  const count = await redis.hget('referral:access-count', subscriberId)

  return {
    count: count ? Number.parseInt(count) : 0,
  }
}
