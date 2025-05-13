"use client";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ProgressBar() {
  const pathname = usePathname();
  NProgress.configure({ showSpinner: false  })

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return null;
}
