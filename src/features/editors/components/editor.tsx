"use client";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";
import { LoadingView, ErrorView } from "@/components/entity-component";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Background,
  MiniMap,
  Controls,
    } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { Node, Edge, Connection } from "@xyflow/react";
import { nodeComponents } from "@/config/node-components";

export const EditorLoading = () => {
  return <LoadingView message="Loading Editor" />;
};
export const EditorError = () => {
  return <ErrorView message="Failed to load Editor" />;
};
export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );
  return (
    <div className="size-full">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeComponents}
      fitView
      proOptions={{
        hideAttribution:true
      }}>
        <Background />
        <MiniMap />
        <Controls />
    </ReactFlow>
    </div>
  );
};
