import { createClient, RedisClient } from "redis";
import { config } from "dotenv";
config();

export class Cache {
  private client: RedisClient;
  constructor() {
    this.connect();
  }
  /**
   * Connect to Redis
   */
  public connect() {
    try {
      this.client = createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as any,
      });
      console.log("Successfully connected to Redis");
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Disconnect from Redis
   */
  public disconnect() {
    this.client.end(true);
  }

  /**
   * Get object as instance of given type
   *
   * @param key Cache key
   * @returns Object
   */
  public getObject<T>(key: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      return this.client.get(key, (err, data) => {
        if (err) {
          reject(err);
        }

        if (data === null) resolve(null);

        return resolve(JSON.parse(data) as T);
      });
    });
  }

  /**
   * Store object
   *
   * @param key Cache Key
   * @param obj Object to store
   */
  public setObject<T>(key: string, obj: T) {
    this.client.set(key, JSON.stringify(obj), (err) => {
      if (err) console.error(err);
    });
  }

  /**
   * Get object as instance of given type and store if not existing in cache
   *
   * @param key Cache Key
   * @param fn Function to fetch data if not existing
   * @returns Object
   */
  public getAndSetObject<T>(key: string, fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      return this.client.get(key, async (err, data) => {
        if (err) {
          reject(err);
        }

        // Fetch from db and store in cache
        if (data === null) {
          const fetched = await fn();
          this.setObject(key, fetched);
          return resolve(fetched as T);
        }

        return resolve(JSON.parse(data) as T);
      });
    });
  }

  /**
   * Delete entry by key
   *
   * @param key Cache key
   */
  public deleteByKey(key: string) {
    this.client.del(key);
  }
}
