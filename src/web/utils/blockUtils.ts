import type {PartialMarkdownStyle} from '../../styleUtils';
import type {NodeType} from './treeUtils';

function addStyleToBlock(targetElement: HTMLElement, type: NodeType, markdownStyle: PartialMarkdownStyle) {
  const node = targetElement;
  switch (type) {
    case 'line':
      Object.assign(node.style, {
        margin: '0',
        padding: '0',
        position: 'relative',
        width: 'fit-content',
        maxWidth: '100%',
        boxSizing: 'border-box',
      });
      break;
    case 'syntax':
      Object.assign(node.style, markdownStyle.syntax);
      break;
    case 'bold':
      node.style.fontWeight = 'bold';
      break;
    case 'italic':
      node.style.fontStyle = 'italic';
      break;
    case 'strikethrough':
      node.style.textDecoration = 'line-through';
      break;
    case 'emoji':
      Object.assign(node.style, {...markdownStyle.emoji, verticalAlign: 'middle'});
      break;
    case 'mention-here':
      Object.assign(node.style, markdownStyle.mentionHere);
      break;
    case 'mention-user':
      Object.assign(node.style, markdownStyle.mentionUser);
      break;
    case 'mention-report':
      Object.assign(node.style, markdownStyle.mentionReport);
      break;
    case 'link':
      Object.assign(node.style, {
        ...markdownStyle.link,
        textDecoration: 'underline',
      });
      break;
    case 'code':
      Object.assign(node.style, {...markdownStyle.code, lineHeight: 1.5});
      break;
    case 'pre':
      Object.assign(node.style, {
        ...markdownStyle.pre,
        backgroundColor: 'transparent',
        padding: 0,
      });
      Object.assign((node.parentNode as HTMLElement).style, {
        padding: '3px',
      });
      break;

    case 'blockquote':
      Object.assign(node.style, {
        ...markdownStyle.blockquote,
        borderLeftStyle: 'solid',
        display: 'inline-block',
        maxWidth: '100%',
        boxSizing: 'border-box',
      });
      break;
    case 'h1':
      Object.assign(node.style, {
        ...markdownStyle.h1,
        fontWeight: 'bold',
      });
      break;
    default:
      break;
  }
}

// eslint-disable-next-line import/prefer-default-export
export {addStyleToBlock};
