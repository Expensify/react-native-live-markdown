import {AboutExample} from './AboutExample';
import {MarkdownPreviewExample} from './MarkdownPreviewExample';
import {PlaygroundExample} from './PlaygroundExample';

interface Example {
  icon?: string;
  title: string;
  screen: React.FC;
}

export const EXAMPLES: Record<string, Example> = {
  PlaygroundExample: {
    icon: '🎮',
    title: 'Playground',
    screen: PlaygroundExample,
  },
  MarkdownPreviewExample: {
    icon: '👁️',
    title: 'Markdown Preview',
    screen: MarkdownPreviewExample,
  },
  AboutExample: {
    icon: 'ℹ️',
    title: 'About',
    screen: AboutExample,
  },
} as const;
