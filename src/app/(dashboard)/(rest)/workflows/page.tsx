import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth.utils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { WorkflowsError, WorkflowsList } from "@/features/workflows/components/workflows";
import { WorkflowsContainer } from "@/features/workflows/components/workflows";
import { SearchParams } from "nuqs";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { WorkflowsLoading } from "@/features/workflows/components/workflows";

type Props = {
  searchParams: Promise<SearchParams>
}
const Page = async ({searchParams}: Props) => {
  await requireAuth();
  const params = await workflowsParamsLoader(searchParams)
  prefetchWorkflows(params)

  return (
    <WorkflowsContainer>    
    <HydrateClient>
      {/* react-error-boundary expects FallbackComponent or fallbackRender */}
      <ErrorBoundary fallback={<WorkflowsError />}>
        <Suspense fallback={<WorkflowsLoading />}>
          <WorkflowsList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;
