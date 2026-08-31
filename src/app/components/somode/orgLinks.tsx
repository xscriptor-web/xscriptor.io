import type { ReactNode } from "react";
import ColorsIcon from "@/app/components/xcomponents/icons/ColorsIcon";
import XfetchIcon from "@/app/components/xcomponents/icons/XfetchIcon";
import WebLabIcon from "@/app/components/xcomponents/icons/WebLabIcon";
import AiIcon from "@/app/components/xcomponents/icons/AiIcon";
import XGitHubIcon from "@/app/components/xcomponents/icons/XGitHubIcon";
import XIcon from "@/app/components/xcomponents/icons/XIcon";
import TerminalFiltersIcon from "@/app/components/xcomponents/icons/TerminalFiltersIcon";
import { resourceRepos } from "@/data/resources/resources.data";

export type OrgRepoLink = {
  name: string;
  href: string;
};

export type OrgLink = {
  key: string;
  path: string;
  label: string;
  href: string;
  icon?: ReactNode;
  repos: OrgRepoLink[];
};

const orgIcons: Record<string, ReactNode> = {
  colors: <ColorsIcon size={14} />,
  "xfetch-cli": <XfetchIcon size={14} />,
  web: <WebLabIcon size={14} />,
  ai: <AiIcon size={14} />,
  gitnapse: <XGitHubIcon size={14} />,
  xlinux: <XIcon size={14} />,
  xwa: <TerminalFiltersIcon size={14} />,
  legacy: <XGitHubIcon size={14} />,
};

export const orgLinks: OrgLink[] = resourceRepos.map((repo) => {
  const orgHref = repo.href.replace(/\/$/, "");
  return {
    key: repo.name,
    path: `/resources/${repo.name}`,
    label: repo.displayName ?? repo.name,
    href: repo.href,
    icon: orgIcons[repo.name],
    repos: repo.repos.map((r) => ({
      name: r,
      href: `${orgHref}/${r}`,
    })),
  };
});
