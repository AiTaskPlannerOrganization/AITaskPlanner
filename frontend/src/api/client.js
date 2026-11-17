/**
 * Base HTTP client for backend communication.
 *
 * VITE_API_URL empty (default in development) → relative requests to /api,
 * forwarded to the backend by the Vite dev proxy (see vite.config.js).
 * VITE_API_URL set → requests go directly to that origin.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

function buildUrl(endpoint) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${path}`;
}

/** Plain objects/arrays are sent as JSON; FormData, Blob, strings etc. are sent as is. */
function isJsonBody(body) {
  if (body === null || typeof body !== 'object') return false;
  const proto = Object.getPrototypeOf(body);
  return Array.isArray(body) || proto === Object.prototype || proto === null;
}

/** Empty body → null, JSON content type → parsed object, anything else → text. */
async function parseBody(response) {
  const text = await response.text();
  if (!text) return null;

  const contentType = response.headers.get('Content-Type') || '';
  if (!contentType.includes('application/json')) return text;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Perform an HTTP request and return the parsed response body.
 * @param {string} endpoint - API path, e.g. '/api/health'
 * @param {RequestInit & { body?: unknown }} [options] - fetch options; a plain object body is JSON-encoded
 * @returns {Promise<unknown>} parsed JSON, text, or null for an empty body
 * @throws {Error & { status: number, data: unknown }} when the response status is not 2xx
 */
export async function apiClient(endpoint, options = {}) {
  const headers = new Headers(options.headers);
  let { body } = options;

  if (isJsonBody(body)) {
    body = JSON.stringify(body);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  const response = await fetch(buildUrl(endpoint), { ...options, headers, body });
  const data = await parseBody(response);

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && typeof data.message === 'string'
        ? data.message
        : `Request failed with status ${response.status}${response.statusText ? ` (${response.statusText})` : ''}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export default apiClient;
