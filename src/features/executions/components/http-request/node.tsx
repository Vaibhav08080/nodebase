"use client"
import { useReactFlow, type Node as FlowNode, type NodeProps } from "@xyflow/react"
import { GlobeIcon } from "lucide-react"
import { memo, useState } from "react"
import { BaseExecutionNode } from "../base-execution-node"
import { HTTPRequestDialog } from "./dialog"

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  [key: string]: unknown;
}
type HttpRequestNodeType = FlowNode<HttpRequestNodeData>
export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);  
  const {setNodes}=useReactFlow()
  const nodeData = props.data 
  const handleOpenSettings = ()=>setDialogOpen(true)
  const handleSubmit=(values:{
    endpoint:string;
    method:string;
    body?:string;
  })=>{
    setNodes((nodes)=>{
      return nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              endpoint: values.endpoint,
              method: values.method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
              body: values.body || undefined,
            },
          };
        }
        return node;
      });
    });
  }
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "not configured";
  const nodeStatus="initial"
  return (
    <>
    <HTTPRequestDialog
     open={dialogOpen}
      onOpenChange={setDialogOpen}
      onSubmit={handleSubmit}
      defaultEndpoint={nodeData.endpoint}
      defaultMethod={nodeData.method}
      defaultBody={nodeData.body}
       />  
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        status={nodeStatus}
        description={description}
        onDoubleClick={handleOpenSettings}
        onsettings={handleOpenSettings}
      />
    </>
  );
});
HttpRequestNode.displayName = "HttpRequestNode"