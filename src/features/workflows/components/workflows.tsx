"use client";
import { useSuspenseWorkflows } from "../hooks/use-workflows";
import { EntityHeader, EntityContainer } from "@/components/entity-component";
import React from "react";
import { useCreateWorkflow } from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { EntitySearch } from "@/components/entity-component";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { EntityPagination } from "@/components/entity-component";
export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return (
    <div className="flex-1 flex justify-center items-center">
      {JSON.stringify(workflows.data, null, 2)}
    </div>
  );
};

export const WorkflowSearch = () => {
  const [params , setParams] = useWorkflowsParams();
  const {searchValue , setSearchValue} = useEntitySearch({
    params,
    setParams,
    debounceMs:500
  })
  return (
    <EntitySearch
      value={searchValue}
      onChange={(value) => {setSearchValue(value)}}
      placeholder="Search workflows"
    />
  );
};

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

export const WorkflowsPagination = ()=>{
  const workflows = useSuspenseWorkflows();
  const [params , setParams] = useWorkflowsParams();
  return(
    <EntityPagination
    page={params.page}
    totalPages={workflows.data.totalPages}
    onPageChange={(page)=>setParams({...params,page})}
    disabled={workflows.isFetching}
    />
  )
}

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
