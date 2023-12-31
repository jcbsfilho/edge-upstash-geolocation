import { Redis, RedisConfigNodejs } from "@upstash/redis";

export interface RedisConfig extends RedisConfigNodejs {}

export interface ResultProps {
  result: string | null;
  status?: number;
}

export async function redisGet(search: string, config: RedisConfigNodejs): Promise<ResultProps> {
  try {
    const redis = new Redis(config);
    const result = await redis.get<string>(search);
    if (!result) {
      return { result, status: 404 };
    }
    return { result, status: 200 };
  } catch (error:any) {
    return { result: error?.message || 'fail get item', status: 500 };
  }
}
