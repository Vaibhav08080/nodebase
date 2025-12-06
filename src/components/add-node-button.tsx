"use client";

import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onClick?: () => void;
  className?: string;
};

export const AddNodeButton = memo(({ onClick, className }: Props) => {
  return (
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
  );
});

AddNodeButton.displayName = "AddNodeButton";