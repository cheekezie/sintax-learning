import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { logger } from '../logger.service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

/** Global authentication error handler (401) */
type AuthErrorHandler = (errorMessage?: string) => void;
let globalAuthErrorHandler: AuthErrorHandler | null = null;
let isHandlingAuthError = false;

export const setGlobalAuthErrorHandler = (handler: AuthErrorHandler) => {
  globalAuthErrorHandler = handler;
};

type ApiErrorExtras = {
  statusCode?: number;
  code?: number;
  data?: any;
  endpoint?: string;
  method?: string;
};

export class ApiError extends Error {
  constructor(message: string, extras?: Record<string, any>) {
    super(message);
    this.name = 'ApiError';
    Object.assign(this, extras);
  }
}

const getMessage = (message: any) => {
  if (message && typeof message === 'object') {
    const firstKey = Object.keys(message)[0];
    return message[firstKey];
  }
  return message;
};

const callAuthHandlerOnce = (message: string) => {
  if (!globalAuthErrorHandler || isHandlingAuthError) return;

  isHandlingAuthError = true;
  try {
    globalAuthErrorHandler(message);
  } catch (handlerError) {
    // logger.error('Error in global auth error handler', handlerError);
  } finally {
    setTimeout(() => {
      isHandlingAuthError = false;
    }, 2000);
  }
};

const toApiError = (err: unknown, endpoint?: string, method?: string): ApiError => {
  // Axios error with a response
  if (axios.isAxiosError(err) && err.response) {
    const { status, data } = err.response as AxiosResponse<any>;

    // Logging
    // if (endpoint && method) logger.apiError(endpoint, method, err);
    // else logger.error('API request failed', err);

    const is401 = data?.code === 401 || data?.statusCode === 401 || status === 401;
    if (is401) {
      const errorMessage =
        data?.message ||
        data?.error ||
        (typeof data?.error === 'string' ? data.error : null) ||
        'Your session has expired. Please log in again.';

      callAuthHandlerOnce(errorMessage);

      return new ApiError(getMessage(errorMessage) ?? errorMessage, {
        statusCode: 401,
        code: 401,
        data,
        endpoint,
        method,
      });
    }

    const msgFromApi = data?.message
      ? getMessage(data.message)
      : typeof data?.error === 'string'
        ? data.error
        : undefined;

    const fallback = status === 500 || status === 503 ? 'Unable to process request. Try again' : 'Request failed';

    return new ApiError(msgFromApi ?? fallback, {
      statusCode: status,
      code: data?.code ?? status,
      data,
      endpoint,
      method,
    });
  }

  // Network/system error
  // logger.error('Network or system error occurred', err);
  const fallbackMessage =
    typeof (err as any)?.message === 'string' && (err as any).message.trim().length > 0
      ? (err as any).message
      : 'A system error occurred';

  return new ApiError(fallbackMessage, {
    statusCode: 1000,
    code: 1000,
    data: err,
    endpoint,
    method,
  });
};

export class RequestService {
  private static token: string | null = null;
  private static client: AxiosInstance | null = null;

  /** Initialize token from localStorage */
  private static initializeToken() {
    if (RequestService.token === null) {
      RequestService.token = localStorage.getItem('auth_token');
    }
  }

  /** Set authentication token and persist to localStorage */
  static setToken(token: string | null) {
    RequestService.token = token;
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  }

  /** Get current authentication token */
  static getToken() {
    RequestService.initializeToken();
    return RequestService.token;
  }

  /** Check if user is authenticated */
  static isAuthenticated(): boolean {
    RequestService.initializeToken();
    return !!RequestService.token;
  }

  static constructQueryString(params: Record<string, any>): string {
    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  private static getOrgHeaders() {
    const headers: Record<string, string> = {};
    const activeOrgId = localStorage.getItem('active_org_id');
    if (activeOrgId) {
      headers['X-Organization-Id'] = activeOrgId;
      headers['Organization-Id'] = activeOrgId;
    }
    return headers;
  }

  /** Create (or return) a single axios instance with interceptors */
  private static getClient(): AxiosInstance {
    if (RequestService.client) return RequestService.client;

    const client = axios.create({
      baseURL: API_BASE_URL,
      headers: { Accept: 'application/json' },
    });

    // Request interceptor: attach auth/org headers and set content-type
    client.interceptors.request.use((config) => {
      const token = RequestService.getToken();
      const orgHeaders = RequestService.getOrgHeaders();

      config.headers = {
        ...(config.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...orgHeaders,
      } as any;

      // Default content type for JSON requests unless explicitly set (e.g. file/blob)
      if (!config.headers['Content-Type'] && !config.headers['content-type']) {
        config.headers['Content-Type'] = 'application/json';
      }

      return config;
    });

    // Response interceptor: normalize errors to ApiError
    client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => Promise.reject(error),
    );

    RequestService.client = client;
    return client;
  }

  private static async timed<T>(label: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    try {
      const res = await fn();
      return res;
    } finally {
      const duration = performance.now() - startTime;
      // logger.performance(label, duration);
    }
  }

  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const client = RequestService.getClient();

    try {
      return await RequestService.timed(`GET ${url}`, async () => {
        const res = await client.get<T>(url, config);
        return res.data;
      });
    } catch (err) {
      return Promise.reject(toApiError(err, url, 'GET'));
    }
  }

  static async post<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    const client = RequestService.getClient();

    try {
      return await RequestService.timed(`POST ${url}`, async () => {
        const res = await client.post<T>(url, data, config);
        return res.data;
      });
    } catch (err) {
      return Promise.reject(toApiError(err, url, 'POST'));
    }
  }

  static async put<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    const client = RequestService.getClient();

    try {
      return await RequestService.timed(`PUT ${url}`, async () => {
        const res = await client.put<T>(url, data, config);
        return res.data;
      });
    } catch (err) {
      return Promise.reject(toApiError(err, url, 'PUT'));
    }
  }

  static async patch<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    const client = RequestService.getClient();

    try {
      return await RequestService.timed(`PATCH ${url}`, async () => {
        const res = await client.patch<T>(url, data, config);
        return res.data;
      });
    } catch (err) {
      return Promise.reject(toApiError(err, url, 'PATCH'));
    }
  }

  static async delete<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    const client = RequestService.getClient();

    try {
      return await RequestService.timed(`DELETE ${url}`, async () => {
        const res = await client.delete<T>(url, { ...config, data });
        return res.data;
      });
    } catch (err) {
      return Promise.reject(toApiError(err, url, 'DELETE'));
    }
  }

  static async postFile<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const client = RequestService.getClient();

    try {
      return await RequestService.timed(`POST FILE ${url}`, async () => {
        const res = await client.post<T>(url, data, {
          ...config,
          headers: {
            ...(config?.headers ?? {}),
            'Content-Type': 'multipart/form-data',
          },
        });
        return res.data;
      });
    } catch (err) {
      return Promise.reject(toApiError(err, url, 'POST'));
    }
  }

  /** Get a file/blob response (for downloads) */
  static async getBlob(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    const client = RequestService.getClient();

    try {
      return await RequestService.timed(`GET BLOB ${url}`, async () => {
        const res = await client.get(url, {
          ...config,
          responseType: 'blob',
          headers: {
            ...(config?.headers ?? {}),
            Accept: '*/*',
          },
        });
        return res.data as Blob;
      });
    } catch (err: any) {
      // If server returns error as blob, try to read JSON message
      if (axios.isAxiosError(err) && err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const parsed = JSON.parse(text);
          const transformed = {
            ...err,
            response: { ...err.response, data: parsed },
          };
          return Promise.reject(toApiError(transformed, url, 'GET'));
        } catch {
          // fallthrough to standard handler
        }
      }
      return Promise.reject(toApiError(err, url, 'GET'));
    }
  }
}
