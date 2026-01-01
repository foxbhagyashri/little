import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async () => {
        // No-op for frontend only
        return null;
      },
    },
  },
});
