import React from 'react';

/**
 * Bridge: Mintlify <Steps>/<Step title="..."> → styled steps.
 * Mintlify API: <Steps><Step title="Step One">content</Step></Steps>
 */

export function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
