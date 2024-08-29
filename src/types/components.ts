import { LucideIcon } from "lucide-react";

export interface SideNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface SideNavigationLinksProps {
  currentPath: string;
  href: string;
  Icon: LucideIcon;
  label: string;
  disabled?: boolean;
  order?: "default" | "last";
}
