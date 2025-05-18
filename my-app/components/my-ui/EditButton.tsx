/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/my-ui/Modal"));
import EditProfileForm from "../forms/EditProfile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEditUser } from "@/lib/api/editUser";
import { signOut } from "next-auth/react";

export default function ClientEditButton({ user }: { user: any }) {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const mutation = useEditUser(user.id);

  const handleEditClick = () => {
    modalRef.current?.open();
  };

  const handleSave = (values: any) => {

    const updatedFields = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== user[key]) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    if (Object.keys(updatedFields).length === 0) {
      toast.info("Nenhuma alteração foi feita.");
      modalRef.current?.close();
      return;
    }

    mutation.mutate(updatedFields, {
      onSuccess: () => {
        modalRef.current?.close();

        signOut({ callbackUrl: "/login" });
      },
    });
  };

  return (
    <>
      <Button variant="default" onClick={handleEditClick}>
        Editar
      </Button>
      <Modal ref={modalRef}>
        <EditProfileForm
          userData={user}
          onSubmit={handleSave}
          onClose={() => modalRef.current?.close()}
        />
      </Modal>
    </>
  );
}
