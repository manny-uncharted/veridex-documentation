import { Callout as NextraCallout } from 'nextra/components';
import React from 'react';

/**
 * Bridge: Mintlify <Callout type="..."> → Nextra <Callout type="...">.
 * Mintlify types: "info", "warning", "danger", "tip"
 * Nextra types:   "info", "warning", "error", "default"
 */

const TYPE_MAP: Record<string, 'info' | 'warning' | 'error' | 'default'> = {
  info: 'info',
  warning: 'warning',
  danger: 'error',
  error: 'error',
  tip: 'default',
  note: 'default',
};

export function Callout({
  type = 'info',
  children,
}: {
  type?: string;
  children: React.ReactNode;
}) {
  const nextraType = TYPE_MAP[type] || 'default';
  return <NextraCallout type={nextraType}>{children}</NextraCallout>;
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
