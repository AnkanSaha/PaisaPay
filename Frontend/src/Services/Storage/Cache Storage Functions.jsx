/**
 * The function `SaveCache` is an asynchronous function that saves data to a cache database and returns
 * a status and message indicating the success or failure of the operation.
 * @returns The function `SaveCache` returns an object with two properties: `status` and `message`. The
 * `status` property indicates whether the cache was saved successfully (`true` for success, `false`
 * for failure), and the `message` property provides a corresponding message.
 */
export const SaveCache = async (Database, Searchkey, MainData) => {
  try {
    const CacheDB = await caches.open(Database);
    await CacheDB.put(Searchkey, new Response(JSON.stringify(MainData)));
    return {
        status: true,
        message: "Cache Saved Successfully",
    };
  } catch {
    return {
      status: false,
      message: "Unable to save cache",
    };
  }
};


/**
 * The function `GetCache` is an asynchronous function that retrieves data from a cache database based
 * on a search key and returns a response object with the status, message, and data.
 * @returns an object with the following properties:
 * - status: a boolean value indicating whether the cache retrieval was successful or not
 * - message: a string message indicating the status of the cache retrieval
 * - data: the retrieved cache data in JSON format
 */
export const GetCache = async (Database, Searchkey) => {
    try{
        const CacheDB = await caches.open(Database);
        const CacheData = await CacheDB.match(Searchkey);
        const CacheDataJSON = await CacheData.json();
        return {
            status: true,
            message: "Cache Retrieved Successfully",
            data: CacheDataJSON
        }
    }
    catch {
        return {
            status: false,
            message: "Unable to get cache",
        }
    }
}

/**
 * The DeleteCache function is an asynchronous function that deletes a cache entry from a specified
 * database and returns a status and message indicating the success or failure of the operation.
 * @returns an object with two properties: "status" and "message". The "status" property indicates
 * whether the cache deletion was successful or not, and the "message" property provides a
 * corresponding message.
 */
export const DeleteCache = async (Database, Searchkey) => {
    try{
        const CacheDB = await caches.open(Database);
        await CacheDB.delete(Searchkey);
        return {
            status: true,
            message: "Cache Deleted Successfully"
        }
    }
    catch {
        return {
            status: false,
            message: "Unable to delete cache"
        }
    }
}