/**
 * Tiny typed fetch wrapper. All API calls go through here.
 * In dev, MSW intercepts at the SW layer — fetch() is unchanged.
 */

const apiBase =
  typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : '';

export class ApiError extends Error {
  constructor(
    public override readonly message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('Accept', 'application/json');

  const res = await fetch(`${apiBase}${path}`, { ...init, headers });
  const text = await res.text();
  const body = text ? safeJson(text) : undefined;

  if (!res.ok) {
    const message =
      (body && typeof body === 'object' && 'message' in body
        ? String((body as { message: unknown }).message)
        : '') || `Request failed with ${res.status}`;
    throw new ApiError(message, res.status, body);
  }

  return body as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
