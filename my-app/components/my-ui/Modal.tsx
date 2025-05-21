"use client";

import { createPortal } from 'react-dom';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const Modal = forwardRef(({ children }: { children: React.ReactNode }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-zinc-950/90 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl">
        {children}
      </div>
    </div>,
    document.body
  );
});

Modal.displayName = "Modal";

export default Modal;