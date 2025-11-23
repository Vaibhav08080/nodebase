"use client";

import { TRPCClientError } from "@trpc/client";
import { useState } from "react";
import { UpgradeModal } from "@/components/upgrade-modal";

export const useUpgradeModal = () => {
  const [open, setOpen] = useState(false);

  const handleError = (error: unknown) => {
    // Check if tRPC error
    if (error instanceof TRPCClientError) {
      // Check if error has data and code
      if (error.data?.code === "FORBIDDEN") {
        setOpen(true);
        return true;
      }
    }

    return false;
  };

  const modal = (
    <UpgradeModal open={open} onOpenChange={setOpen} />
  );

  return { handleError, modal };
};
