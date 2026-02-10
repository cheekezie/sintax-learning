import Cookies from 'js-cookie';

/**
 * Interface for cached data structure with expiration
 */
export interface CachedData<T> {
  data: T;
  expiresAt: number;
}

type GetCookieOptions = { key: string };

/**
 * Default cookie expiry in days
 */
const DEFAULT_EXPIRY_DAYS = 14;

/**
 * Retrieves cached data from cookie with expiry validation
 * @param cookieName - Name of the cookie to retrieve
 * @returns Parsed data if valid and not expired, null otherwise
 */
export function getCookie<T>(key: string): T | null {
  const raw = Cookies.get(key);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as { data: T; expiresAt: number };
    if (!parsed?.expiresAt || Date.now() > parsed.expiresAt) {
      Cookies.remove(key);
      return null;
    }
    return parsed.data;
  } catch {
    Cookies.remove(key);
    return null;
  }
}
type StoreCookieOptions<T> = {
  key: string;
  value: T;
  expiryDays?: number;
};

export function storeCookie<T>({ key, value, expiryDays = DEFAULT_EXPIRY_DAYS }: StoreCookieOptions<T>): void {
  const expiresAt = Date.now() + expiryDays * 24 * 60 * 60 * 1000;

  const cookieData: CachedData<T> = {
    data: value,
    expiresAt,
  };

  Cookies.set(key, JSON.stringify(cookieData), {
    expires: expiryDays,
    sameSite: 'strict',
    secure: window.location.protocol === 'https:',
  });
}

/**
 * Removes a cookie by name
 * @param cookieName - Name of the cookie to remove
 */
export function removeCookie(cookieName: string): void {
  Cookies.remove(cookieName);
}
