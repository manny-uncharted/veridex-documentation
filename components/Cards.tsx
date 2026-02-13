import React from 'react';
import Link from 'next/link';

/**
 * Bridge: Mintlify <Cards>/<Card> → Nextra-compatible card grid.
 * Mintlify API: <Cards><Card title="..." href="...">description</Card></Cards>
 */

export function Card({
  title,
  href,
  children,
  icon,
}: {
  title: string;
  href?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const content = (
    <div className="vdx-card">
      {icon && <div className="vdx-card-icon">{icon}</div>}
      <h3 className="vdx-card-title">{title}</h3>
      {children && <p className="vdx-card-desc">{children}</p>}
    </div>
  );

  if (href) {
    return <Link href={href} className="vdx-card-link">{content}</Link>;
  }

  return content;
}

export function Cards({ children }: { children: React.ReactNode }) {
  return <div className="vdx-cards">{children}</div>;
}

export function CardGroup({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: number;
}) {
  return (
    <div
      className="vdx-cards"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}
