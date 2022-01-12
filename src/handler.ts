/**
 * 1. Read the request
 * 
 * 2. Extract the URL to be cached
 * @example
 * https://dev.finsweet.com/cache/https://gitpod.com/kool-site
 * Extract: https://gitpod.com/kool-site
 *
 * 3. Proceed to fetch the URL (https://gitpod.com/kool-site).
 * - If the response is valid (200), cache it and return it.
 * - If not, try to find a previous cached.
 * - If no cached version, return an error response.
 */



export async function handleRequest(event: FetchEvent): Promise<Response> {
  const {request} = event;

const BASE_URL = 'https://dev.finsweet.com/cache/';

const targetUrl = request.url.replace(BASE_URL, '')
const cache = caches.default
const cacheUrl = new URL(request.url)
const cacheKey = new Request(cacheUrl.toString(), request)

const response = await fetch(targetUrl)

if (response.ok) {
  event.waitUntil(cache.put(cacheKey, response.clone()))
  console.log('response')

  return response
}

const cachedResponse = await cache.match(cacheKey)

if (cachedResponse) return cachedResponse;
else return new Response('Errori');
}