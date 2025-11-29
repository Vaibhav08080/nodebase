import { requireAuth } from "@/lib/auth.utils"
import { prefetchWorkflow } from "@/features/workflows/server/prefetch"
import { ErrorBoundary } from "react-error-boundary"
import { HydrateClient } from "@/trpc/server"
import { Suspense } from "react"
import { EditorError } from "@/features/editors/components/editor"
import { EditorLoading } from "@/features/editors/components/editor"
import { Editor } from "@/features/editors/components/editor"
import { EditorHeader } from "@/features/editors/components/editor-header"
interface Pageprops{
    params:Promise<{workflowId:string}>
}
const Page = async  ({params}:Pageprops)=>{
    await requireAuth()
    const workflowId = await params;
    prefetchWorkflow(workflowId.workflowId)
   return (
  <HydrateClient>
    <ErrorBoundary fallback={<EditorError />}>
      <Suspense fallback={<EditorLoading />}>
      <EditorHeader workflowId={workflowId.workflowId} />
      <main className="flex-1">
        <Editor workflowId={workflowId.workflowId} />
      </main>
      </Suspense>
    </ErrorBoundary>
  </HydrateClient>
);
}
export default Page