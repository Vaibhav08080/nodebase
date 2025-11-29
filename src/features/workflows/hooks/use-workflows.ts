import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useWorkflowsParams } from "./use-workflows-params"

export const useSuspenseWorkflows = () => {
    const [params] = useWorkflowsParams()
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.workflows.getmany.queryOptions(params))
    
}

export const useCreateWorkflow = ()=>{
   
    const queryClient = useQueryClient()
    const trpc = useTRPC()

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess:(data)=>{
            toast.success(`Workflow ${data.name} created successfully`)
            
            queryClient.invalidateQueries(trpc.workflows.getmany.queryOptions({}))
        },
        onError:(error)=>{
            toast.error(`Failed to create workflow ${error.message}`)
        }
    }))

}

export const useRemoveWorkflow = ()=>{
    const queryClient = useQueryClient()
    const trpc = useTRPC()
    return useMutation(trpc.workflows.remove.mutationOptions({
        onSuccess:(data)=>{
            toast.success(`Workflow ${data.name} deleted successfully`)
            queryClient.invalidateQueries(trpc.workflows.getmany.queryOptions({}))
            queryClient.invalidateQueries(trpc.workflows.getone.queryFilter({id:data.id}))
        },
        onError:(error)=>{
            toast.error(`Failed to delete workflow ${error.message}`)
        }
    }))
}