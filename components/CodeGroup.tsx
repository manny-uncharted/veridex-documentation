import React from 'react';
import { Tabs as NextraTabs, Tab as NextraTab } from 'nextra-theme-docs';

/**
 * Bridge: Mintlify <CodeGroup> → Nextra Tabs wrapping code blocks.
 * Mintlify API: <CodeGroup>```bash npm ... ``` ```bash yarn ... ```</CodeGroup>
 * Extracts language labels from the code blocks' meta strings.
 */

export function CodeGroup({ children }: { children: React.ReactNode }) {
  const childArray = React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child)
  );

  if (childArray.length === 0) {
    return <>{children}</>;
  }

  const items = childArray.map((child, i) => {
    const props = child.props as any;
    const dataLanguage = props?.['data-language'] || props?.className?.replace('language-', '') || '';
    const title = props?.['data-title'] || props?.title || dataLanguage || `Tab ${i + 1}`;
    return title;
  });

  return (
    <NextraTabs items={items}>
      {childArray.map((child, i) => (
        <NextraTab key={i}>{child}</NextraTab>
      ))}
    </NextraTabs>
  );
}
