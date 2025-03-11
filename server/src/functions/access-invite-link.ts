import { redis } from '../redis/client'

interface subscribeToEventParams {
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId,
}: subscribeToEventParams) {
  redis.hincrby('referral:access-count', subscriberId, 1) // Increment the access count for the subscriberId
}
