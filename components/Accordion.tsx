import React, { useState } from 'react';

/**
 * Bridge: Mintlify <Accordion>/<AccordionGroup> → collapsible sections.
 * Mintlify API: <Accordion title="..." icon="...">content</Accordion>
 */

export function Accordion({
  title,
  children,
  icon,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  icon?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="vdx-accordion">
      <button
        className="vdx-accordion-trigger"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span>
          {icon && <span className="vdx-accordion-icon">{icon}</span>}
          {title}
        </span>
        <span className={`vdx-accordion-chevron ${open ? 'open' : ''}`}>
          ▸
        </span>
      </button>
      {open && <div className="vdx-accordion-content">{children}</div>}
    </div>
  );
}

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return <div className="vdx-accordion-group">{children}</div>;
}
