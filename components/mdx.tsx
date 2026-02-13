import React, { useState } from 'react';
import { Callout as NextraCallout } from 'nextra/components';
import { Tabs as NextraTabs, Tab as NextraTab } from 'nextra-theme-docs';
import Link from 'next/link';

/* ── Callout ─────────────────────────────────────────────── */

const TYPE_MAP: Record<string, 'info' | 'warning' | 'error' | 'default'> = {
  info: 'info',
  warning: 'warning',
  danger: 'error',
  error: 'error',
  tip: 'default',
  note: 'default',
};

export function Callout({ type = 'info', children }: { type?: string; children: React.ReactNode }) {
  return <NextraCallout type={TYPE_MAP[type] || 'default'}>{children}</NextraCallout>;
}

export function Note({ children }: { children: React.ReactNode }) {
  return <NextraCallout type="default">{children}</NextraCallout>;
}

export function Info({ children }: { children: React.ReactNode }) {
  return <NextraCallout type="info">{children}</NextraCallout>;
}

export function Warning({ children }: { children: React.ReactNode }) {
  return <NextraCallout type="warning">{children}</NextraCallout>;
}

export function Tip({ children }: { children: React.ReactNode }) {
  return <NextraCallout type="default">{children}</NextraCallout>;
}

export function Danger({ children }: { children: React.ReactNode }) {
  return <NextraCallout type="error">{children}</NextraCallout>;
}

/* ── Tabs / Tab ──────────────────────────────────────────── */

export function Tab({ children }: { title?: string; children: React.ReactNode }) {
  return <>{children}</>;
}

export function Tabs({ children }: { children: React.ReactNode }) {
  const childArray = React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child)
  );
  const items = childArray.map((child) => (child.props as any).title || 'Tab');
  return (
    <NextraTabs items={items}>
      {childArray.map((child, i) => (
        <NextraTab key={i}>{(child.props as any).children}</NextraTab>
      ))}
    </NextraTabs>
  );
}

/* ── Cards / Card / CardGroup ────────────────────────────── */

export function Card({
  title, href, children, icon,
}: {
  title: string; href?: string; children?: React.ReactNode; icon?: React.ReactNode;
}) {
  const content = (
    <div className="vdx-card">
      {icon && <div className="vdx-card-icon">{icon}</div>}
      <h3 className="vdx-card-title">{title}</h3>
      {children && <div className="vdx-card-desc">{children}</div>}
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

export function CardGroup({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className="vdx-cards" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}

/* ── Steps / Step ────────────────────────────────────────── */

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="vdx-step">
      <div className="vdx-step-title">{title}</div>
      <div className="vdx-step-content">{children}</div>
    </div>
  );
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="vdx-steps">{children}</div>;
}

/* ── Accordion / AccordionGroup ──────────────────────────── */

export function Accordion({
  title, children, icon, defaultOpen = false,
}: {
  title: string; children: React.ReactNode; icon?: string; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="vdx-accordion">
      <button className="vdx-accordion-trigger" onClick={() => setOpen(!open)} type="button">
        <span>
          {icon && <span className="vdx-accordion-icon">{icon}</span>}
          {title}
        </span>
        <span className={`vdx-accordion-chevron ${open ? 'open' : ''}`}>▸</span>
      </button>
      {open && <div className="vdx-accordion-content">{children}</div>}
    </div>
  );
}

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return <div className="vdx-accordion-group">{children}</div>;
}

/* ── CodeGroup ───────────────────────────────────────────── */

export function CodeGroup({ children }: { children: React.ReactNode }) {
  const childArray = React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child)
  );
  if (childArray.length === 0) return <>{children}</>;
  const items = childArray.map((child, i) => {
    const props = child.props as any;
    return props?.['data-title'] || props?.title || props?.['data-language'] || props?.className?.replace('language-', '') || `Tab ${i + 1}`;
  });
  return (
    <NextraTabs items={items}>
      {childArray.map((child, i) => (
        <NextraTab key={i}>{child}</NextraTab>
      ))}
    </NextraTabs>
  );
}
