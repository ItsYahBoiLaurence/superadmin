import { QueryClient } from "react-query";


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            refetchOnWindowFocus: false,
            staleTime: 50000,
            retry: 1,
            retryDelay: 300000,

        }
    },
})