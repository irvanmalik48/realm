export interface DefaultLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  currentPath: string;

  // SEO props
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
}

export interface GenericPageProps
  extends React.HTMLAttributes<HTMLDivElement> {}
