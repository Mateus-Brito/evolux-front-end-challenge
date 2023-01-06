import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./header";

type LayoutProps = {
  children?: ReactNode;
};

type LayoutContentProps = {
  children?: ReactNode;
};

type LayoutHeaderProps = {
  children?: ReactNode;
};

type SEOProps = {
  title?: string;
  description?: string;
};

function checkComponent(children, componentType) {
  const [component] = React.Children.map(children, (child) => {
    if (!child) return null;
    if (child.type === componentType) return child;

    return null;
  });

  return component;
}

function checkComponents(children, componentTypes) {
  const components = componentTypes.map((componentType) =>
    checkComponent(children, componentType)
  );
  return components;
}

export const SEO = React.memo(
  ({
    title = "Telecom Carrier",
    description = "Be cool and happy coding!",
  }: SEOProps) => (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
      </Head>
    </div>
  )
);

export function LayoutHeader({ children }: LayoutHeaderProps) {
  if (React.isValidElement(children)) return children;

  return <Header />;
}

export const LayoutContent = ({ children }: LayoutContentProps) => {
  if (React.isValidElement(children)) return children;

  return null;
};

const Layout = ({ children }: LayoutProps) => {
  const [seo, header, content] = checkComponents(children, [
    SEO,
    LayoutHeader,
    LayoutContent,
  ]);

  return (
    <>
      {seo ?? <SEO />}
      {header ?? <LayoutHeader />}
      {content ?? <LayoutContent children={children} />}
    </>
  );
};

export default Layout;
