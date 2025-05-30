import { NavLink } from "@/components/my-ui/NavLink";

export function PatientLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <NavLink
        href="/dashboard"
        onClick={() => {
          onNavigate?.();
        }}
      >
        Dashboard
      </NavLink>
      <NavLink
        href="/diary"
        onClick={() => {
          onNavigate?.();
        }}
      >
        Diário
      </NavLink>
    </>
  );
}
