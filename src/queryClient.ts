import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 50000,
            retry: 1,
            retryDelay: 300000,
            suspense: true,
        } as any,
    },
})