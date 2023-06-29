// 3rd party
import { QueryKey, FetchStatus, useQuery } from '@tanstack/react-query';

// package
import { ExecuteRequestResult } from 'lib';

/**
 * Types
 */

export type QueryOptions<T> = {
  retry?: boolean;
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  initialData?: T;
  onError?: (error: Error) => void;
};

export type CachedQueryOptions<T> = QueryOptions<T> & {
  checkCache?: QueryKey;
};

export type QueryResult<T> =
  | {
      isLoading: true;
      isError: undefined;
      fetchStatus: FetchStatus;
      response: undefined;
    }
  | {
      isLoading: false;
      isError: true;
      fetchStatus: FetchStatus;
      response: undefined;
    }
  | { isLoading: false; isError: false; fetchStatus: FetchStatus; response: T };

/**
 * asQueryFn
 */

export async function asQueryFn<T extends object>(
  requestFn: () => ExecuteRequestResult<T>,
) {
  const { ok, val } = await requestFn();

  if (ok === true) {
    return val;
  } else {
    throw val.error;
  }
}

/**
 * useApi
 */

export type UseApiQueryOptions<T> = QueryOptions<T> & {
  queryKey: QueryKey;
  queryFn: () => Promise<T>;
};

export function useApi<T>({
  retry = false,
  refetchOnWindowFocus = false,
  staleTime = 60_000,
  onError = ({ message }: Error) => console.error(message),
  ...options
}: UseApiQueryOptions<T>): QueryResult<T> {
  const query = useQuery({
    retry,
    refetchOnWindowFocus,
    staleTime,
    onError,
    ...options,
  });

  if (query.isLoading) {
    return {
      isLoading: true,
      isError: undefined,
      fetchStatus: query.fetchStatus,
      response: undefined,
    };
  } else if (query.isSuccess) {
    return {
      isLoading: false,
      isError: false,
      fetchStatus: query.fetchStatus,
      response: query.data,
    };
  } else {
    return {
      isLoading: false,
      isError: true,
      fetchStatus: query.fetchStatus,
      response: undefined,
    };
  }
}
