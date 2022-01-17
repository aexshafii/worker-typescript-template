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
 * - If not, try to find a previous cache.
 * - If no cached version, return an error response.
 *  https://worker-typescript-template.alexs5425.workers.dev

 */

export async function handleRequest(event: FetchEvent): Promise<Response> {
  const {request} = event;
console.log(event)
const BASE_URL = 'foamy.io';
console.log(BASE_URL)
const targetUrl = request.url.replace(BASE_URL, '')
console.log(request.url)
console.log(targetUrl)
const cache = caches.default
const cacheUrl = new URL(request.url)
console.log(cacheUrl)

const cacheKey = new Request(cacheUrl.toString(), request)
console.log(cacheKey)

const response = await fetch(targetUrl)

if (response.ok) {
  event.waitUntil(cache.put(cacheKey, response.clone()))
  return response
}

const cachedResponse = await cache.match(cacheKey)

if (cachedResponse) return cachedResponse;
else return new Response('Error ${request.utl}');
}