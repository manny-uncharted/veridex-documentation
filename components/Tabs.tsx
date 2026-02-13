import React from 'react';
import { Tabs as NextraTabs, Tab as NextraTab } from 'nextra-theme-docs';

/**
 * Bridge: Mintlify <Tab title="..."> → Nextra <Tabs.Tab>
 * Mintlify API: <Tabs><Tab title="npm">...</Tab></Tabs>
 * Nextra API:   <Tabs items={['npm', ...]}>  <Tabs.Tab>...</Tabs.Tab></Tabs>
 */

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
