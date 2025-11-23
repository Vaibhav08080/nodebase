'use client';
import { useSuspenseWorkflows } from '../hooks/use-workflows';
import { EntityHeader, EntityContainer } from '@/components/entity-component';
import React from 'react';
import { useCreateWorkflow } from '../hooks/use-workflows';
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import { useRouter } from 'next/navigation';
export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return <div className='flex-1 flex justify-center items-center'>{JSON.stringify(workflows.data, null, 2)}</div>;
};

// Component name must start with a capital letter
export const WorkflowHeaders = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow()
  const {handleError , modal} = useUpgradeModal()
  const router = useRouter()
  const handleCreate = ()=>{
    createWorkflow.mutate(undefined , {
      onSuccess:(data)=>{
        router.push(`/workflows/${data.id}`)
        
      },
      onError:(error)=>{
        handleError(error)
      }
    })
  }
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

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowHeaders disabled={false} />}
      Search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
