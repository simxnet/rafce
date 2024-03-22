"use client";

import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    const queryClient = new QueryClient()
    return (
        <Theme appearance="dark" accentColor="sky" panelBackground="solid" radius="large">
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Theme>
    )
}