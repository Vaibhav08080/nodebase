"use client"
import { requireAuth } from "@/lib/auth.utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC} from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const Page=()=>{
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const {data } = useQuery(trpc.getWorkflows.queryOptions())
  const create  = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess:()=>{
      toast.success("Workflow created successfully")
      queryClient.invalidateQueries({ queryKey: trpc.getWorkflows.queryKey() })
    }
  }))

    return(
        <div>
           {JSON.stringify(data , null , 2)}
           <Button disabled={create.isPending} onClick={()=>create.mutate()}>Create</Button>
        </div>
    )
}
export default Page
