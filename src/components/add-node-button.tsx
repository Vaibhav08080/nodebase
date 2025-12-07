"use client";

import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { NodeSelector } from "./node-selector";
import {useState} from "react";
type Props = {
  onClick?: () => void;
  className?: string;
};

export const AddNodeButton = memo(({ onClick, className }: Props) => {
  const [selectorOpen , setSelectorOpen] = useState(false)
  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
    <Button
      onClick={onClick}
      size="icon"
      variant="outline"
      className={`bg-background ${className ?? ""}`}
      aria-label="Add node"
      title="Add node"
    >
      <PlusIcon />
    </Button>
    </NodeSelector>
  );
});

AddNodeButton.displayName = "AddNodeButton";