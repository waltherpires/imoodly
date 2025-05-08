"use client";

import { forwardRef, useImperativeHandle, useState } from "react";

const Modal = forwardRef(({ children }: { children: React.ReactNode }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
});

Modal.displayName = "Modal";

export default Modal;