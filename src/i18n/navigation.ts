import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Локале-осознанные обёртки над next/link и next/navigation —
// сами подставляют /tg или /en в адрес, когда нужно.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
