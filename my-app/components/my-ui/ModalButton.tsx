"use client";

import { useRef } from "react";
import Modal from "@/components/my-ui/Modal";
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
      <Button variant={variant} onClick={handleClick}>
        {buttonLabel}
      </Button>
      <Modal ref={modalRef}>
        {children(handleClose)}
      </Modal>
    </>
  );
}
