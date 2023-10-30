import aioredis
from dotenv import load_dotenv
from starlette.config import Config

load_dotenv()

config = Config(".env")
REDIS_URL = config('REDIS_URL_PROD')

class RedisDriver:
    def __init__(self):
        self.redis_client = aioredis.from_url(REDIS_URL, decode_responses=True)

    async def set_key(self, key, val, ttl=60): # 60초 후 만료
        await self.redis_client.set(key, val)
        if ttl:
            await self.redis_client.expire(key,ttl)
        return True

    async def get_key(self, key):
        return await self.redis_client.get(key)

    async def set_hash(self, name, mapping, ttl=60):
        await self.redis_client.hset(name=name, mapping=mapping)
        if ttl:
            await self.redis_client.expire(name, ttl)

    async def get_hash(self, name):
        return await self.redis_client.hgetall(name)
