import type { MDXComponents } from 'mdx/types';
import { Callout } from './components/Callout';
import { Tabs, Tab } from './components/Tabs';
import { Cards, Card } from './components/Cards';
import { Steps, Step } from './components/Steps';
import { Accordion, AccordionGroup } from './components/Accordion';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    Tabs,
    Tab,
    Cards,
    Card,
    Steps,
    Step,
    Accordion,
    AccordionGroup,
  };
}
