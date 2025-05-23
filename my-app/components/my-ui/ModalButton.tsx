"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/components/my-ui/Modal"));
import { Button } from "@/components/ui/button";

type ModalButtonProps = {
  buttonLabel: string;
  children: (close: () => void) => React.ReactNode;
  variant?: "default" | "destructive" | "outline";
};

export default function ModalButton({ buttonLabel, children, variant = "default" }: ModalButtonProps) {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);

  const handleClick = () => {
    modalRef.current?.open();
  };

  const handleClose = () => {
    modalRef.current?.close();
  };

  return (
    <>
      <Button variant={variant} className="not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300" onClick={handleClick}>
        {buttonLabel}
      </Button>
      <Modal ref={modalRef}>
        {children(handleClose)}
      </Modal>
    </>
  );
}
