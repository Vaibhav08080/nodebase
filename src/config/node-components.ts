import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-triggers/node";
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  INITIAL: InitialNode,
  HTTP_REQUEST:HttpRequestNode,
  MANUAL_TRIGGER: ManualTriggerNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;


// import { InitialNode } from "@/components/initial-node";
// import { NodeType } from "@/generated/prisma/client";
// import type {NodeTypes} from "@xyflow/react"


// export const nodeComponents = {
//     [NodeType.INITIAL]:InitialNode,

// } as const satisfies NodeTypes

// export type RegisteredNodeType = keyof typeof nodeComponents