/**
 * Base HTTP client wrapper for backend communication.
 * Reads base URL from environment variable VITE_API_URL or defaults to empty (uses local proxy).
 */
const BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Perform an HTTP request with JSON parsing and standardized error handling.
 * @param {string} endpoint - API path (e.g. '/api/health')
 * @param {RequestInit} [options] - Standard Fetch options
 * @returns {Promise<any>}
 */
export async function apiClient(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error = new Error(
      errorBody.message || `Request failed with status ${response.status} (${response.statusText})`
    );
    error.status = response.status;
    error.data = errorBody;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export default apiClient;
