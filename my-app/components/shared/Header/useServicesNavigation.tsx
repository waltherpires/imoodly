import { usePathname, useRouter } from "next/navigation";

export function useServicesNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  function gotToServices() {
    if (pathname === "/") {
      const section = document.getElementById("services");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#services");
    }
  }
  
  return { gotToServices };
}
