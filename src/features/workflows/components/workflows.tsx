"use client";
import { useSuspenseWorkflows } from "../hooks/use-workflows";
import { EntityHeader, EntityContainer, ErrorView, EmptyView } from "@/components/entity-component";
import React from "react";
import { useCreateWorkflow } from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { EntitySearch } from "@/components/entity-component";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { EntityPagination } from "@/components/entity-component";
import { LoadingView } from "@/components/entity-component";
import { EntityList } from "@/components/entity-component";
import type { WorkFlow } from "@/domain/prisma-browser-types";
import { Divide, WorkflowIcon } from "lucide-react";
import { EntityItem } from "@/components/entity-component";
import { formatDistanceToNow } from "date-fns";
import { useRemoveWorkflow } from "../hooks/use-workflows";
export const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, setSearchValue } = useEntitySearch({
    params,
    setParams,
    debounceMs: 500,
  });
  return (
    <EntitySearch
      value={searchValue}
      onChange={(value) => {
        setSearchValue(value);
      }}
      placeholder="Search workflows"
    />
  );
};

export const WorkflowsList=()=>{
  const workflows = useSuspenseWorkflows(); 
  if (workflows.data.items.length===0){
    return <WorkflowsEmpty/>
  }
  return (
   <EntityList
     items={workflows.data.items}
     getKey={(workflow) => workflow.id}
     renderItems={(workflow) => (
      <WorkflowsItem data={workflow}/>
     )}
     emptyView={<WorkflowsEmpty />}
   />
  );
}


// Component name must start with a capital letter
export const WorkflowHeaders = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  const router = useRouter();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Manage your workflows"
        newButtonLabel="New Workflow"
        disabled={disabled}
        onNew={handleCreate}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();
  return (
    <EntityPagination
      page={params.page}
      totalPages={workflows.data.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
      disabled={workflows.isFetching}
    />
  );
};

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowHeaders disabled={false} />}
      Search={<WorkflowSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};


export const WorkflowsLoading = ()=>{
  return <LoadingView message="Loading workflows..."/>
}
export const WorkflowsError = ()=>{
  return <ErrorView  message="Failed to load workflows"/>
}

export const WorkflowsEmpty = ()=>{
  const createWorkflow = useCreateWorkflow();
  const {handleError , modal } = useUpgradeModal();
  const router = useRouter();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return <>
  {modal}
  <EmptyView onNew={handleCreate} message="You haven't Created any workflows yet Get Started by Creating your First workflow"/>
  </>
}

export const WorkflowsItem = ({data}:{data:WorkFlow})=>{
  const removeWorkflow = useRemoveWorkflow();
  const handleRemove = ()=>{
    removeWorkflow.mutate({id:data.id})
  }

  return(
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
        Updated {formatDistanceToNow(data.updatedAt , {addSuffix:true})}{" "}
        &bull; Created {" "}
        {formatDistanceToNow(data.createdAt , {addSuffix:true})}

        
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-4 text-muted-foreground" />
          
        </div>
      }
     
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  )
}