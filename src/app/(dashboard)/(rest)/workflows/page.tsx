import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth.utils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { WorkflowsList } from "@/features/workflows/components/workflows";
import { WorkflowsContainer } from "@/features/workflows/components/workflows";
const Page = async () => {
  await requireAuth();
  prefetchWorkflows();

  return (
    <WorkflowsContainer>    
    <HydrateClient>
      {/* react-error-boundary expects FallbackComponent or fallbackRender */}
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkflowsList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;
