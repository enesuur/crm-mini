import axios, { AxiosError, AxiosResponse } from "axios";

/**
 * Axios instance for remote API requests without predefined baseURL.
 *
 * Sends JSON requests and includes credentials (cookies).
 *
 * Request interceptor passes config unchanged (extendable).
 * Response interceptor unwraps data on success and throws error with message on failure.
 *
 * @example
 * ```ts
 * import { remoteInstance } from '@/lib/axios';
 *
 * const data = await remoteInstance.get('http://example.com/api/endpoint');
 * ```
 */
export const remoteInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

remoteInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    const resData = error.response?.data;
    const msg =
      typeof resData === "string"
        ? resData
        : typeof resData === "object" &&
          resData !== null &&
          "message" in resData
        ? (resData as { message: string }).message
        : error.message || "Unknown error";
    return Promise.reject(new Error(msg));
  }
);
