import { NavLink } from "@/components/my-ui/NavLink";

export function PsychologistLinks({ onNavigate }: { onNavigate?: () => void }) {
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
        href="/patients"
        onClick={() => {
          onNavigate?.();
        }}
      >
        Pacientes
      </NavLink>
      <NavLink
        href="/messages"
        onClick={() => {
          onNavigate?.();
        }}
      >
        Mensagens
      </NavLink>
    </>
  );
}
