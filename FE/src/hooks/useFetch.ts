import { useState, useCallback } from "react";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface UseFetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData: (body?: any) => Promise<void>;
}

function useFetch<T>(url: string, options: FetchOptions): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (body?: any) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = (await response.json()) as T;
        setData(responseData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { data, error, loading, fetchData };
}

export const usePost = <T>(url: string) => {
  const options: FetchOptions = { method: "POST" };
  return useFetch<T>(url, options);
};

export const usePatch = <T>(url: string) => {
  const options: FetchOptions = { method: "PATCH" };
  return useFetch<T>(url, options);
};

export const useDelete = <T>(url: string) => {
  const options: FetchOptions = { method: "DELETE" };
  return useFetch<T>(url, options);
};
