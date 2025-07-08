import type {InlineImagesInputProps, MarkdownRange} from '../../commonTypes';
import type {MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import {parseStringWithUnitToNumber} from '../../styleUtils';
import type {PartialMarkdownStyle} from '../../styleUtils';
import {addInlineImagePreview} from '../inputElements/inlineImage';
import type {NodeType, TreeNode} from './treeUtils';

function addStyleToBlock(targetElement: HTMLElement, type: NodeType, markdownStyle: PartialMarkdownStyle, isMultiline = true) {
  const node = targetElement;

  switch (type) {
    case 'line':
      Object.assign(node.style, {
        margin: '0',
        padding: '0',
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
      Object.assign(node.style, {
        ...markdownStyle.emoji,
        verticalAlign: 'middle',
        fontStyle: 'normal', // remove italic
        textDecoration: 'none', // remove strikethrough
        display: 'inline-block',
      });
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
    case 'pre':
      addCodeBlockStyles(targetElement, type, markdownStyle, isMultiline);
      break;
    case 'blockquote':
      Object.assign(node.style, {
        ...markdownStyle.blockquote,
        borderLeftStyle: 'solid',
        display: 'inline-block',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflowWrap: 'anywhere',
      });
      break;
    case 'h1':
      Object.assign(node.style, {
        ...markdownStyle.h1,
        fontWeight: 'bold',
      });
      break;
    case 'block':
      Object.assign(node.style, {
        display: 'block',
        margin: '0',
        padding: '0',
        position: 'relative',
      });
      break;
    case 'text':
      if (!isMultiline && targetElement.parentElement?.style) {
        // Move text background styles from parent to the text node
        const parentElement = targetElement.parentElement;
        node.style.cssText = parentElement.style.cssText;
        parentElement.style.cssText = '';
      }
      break;
    default:
      break;
  }
}

function addCodeBlockStyles(targetElement: HTMLElement, type: NodeType, markdownStyle: PartialMarkdownStyle, isMultiline = true) {
  const node = targetElement;

  const defaultCodePadding = markdownStyle.code?.padding ?? 0;
  const codeHorizontalPadding = parseStringWithUnitToNumber(markdownStyle.code?.paddingHorizontal ?? defaultCodePadding).toString();
  const codeVerticalPadding = parseStringWithUnitToNumber(markdownStyle.code?.paddingVertical ?? defaultCodePadding).toString();

  switch (type) {
    case 'code':
      Object.assign(node.style, {
        ...markdownStyle.code,
        fontSize: markdownStyle.code?.h1NestedFontSize && isChildOfMarkdownElement(node, 'h1') ? markdownStyle.code.h1NestedFontSize : markdownStyle.code?.fontSize,
        padding: `${codeVerticalPadding}px ${codeHorizontalPadding}px`,
        lineHeight: 1.5,
      });
      break;
    case 'pre':
      if (isMultiline) {
        Object.assign(node.style, {
          ...markdownStyle.pre,
        });
      } else {
        Object.assign(node.style, {
          ...markdownStyle.code,
          padding: `${codeVerticalPadding}px ${codeHorizontalPadding}px`,
        });
      }
      break;
    default:
      break;
  }
}

const BLOCK_MARKDOWN_TYPES = ['inline-image'];
const FULL_LINE_MARKDOWN_TYPES = ['blockquote'];
const MULTILINE_MARKDOWN_TYPES = ['codeblock'];

function isBlockMarkdownType(type: NodeType) {
  return BLOCK_MARKDOWN_TYPES.includes(type);
}

function isMultilineMarkdownType(type: NodeType) {
  return MULTILINE_MARKDOWN_TYPES.includes(type);
}

function getFirstBlockMarkdownRange(ranges: MarkdownRange[]) {
  const blockMarkdownRange = ranges.find((r) => isBlockMarkdownType(r.type) || FULL_LINE_MARKDOWN_TYPES.includes(r.type));
  return blockMarkdownRange && FULL_LINE_MARKDOWN_TYPES.includes(blockMarkdownRange.type) ? undefined : blockMarkdownRange;
}

function extendBlockStructure(
  currentInput: MarkdownTextInputElement,
  targetNode: TreeNode,
  currentRange: MarkdownRange,
  ranges: MarkdownRange[],
  text: string,
  markdownStyle: PartialMarkdownStyle,
  inlineImagesProps: InlineImagesInputProps,
) {
  switch (currentRange.type) {
    case 'inline-image':
      return addInlineImagePreview(currentInput, targetNode, text, ranges, markdownStyle, inlineImagesProps);
    default:
      break;
  }

  return targetNode;
}

function isDescendantOfMarkdownElement(node: HTMLElement, predicate: (type: string | null) => boolean): boolean {
  let currentNode = node.parentNode;
  while (currentNode && (currentNode as HTMLElement)?.contentEditable !== 'true') {
    const elementType = (currentNode as HTMLElement).getAttribute?.('data-type');
    if (predicate(elementType)) {
      return true;
    }
    currentNode = currentNode.parentNode;
  }
  return false;
}

function isChildOfMarkdownElement(node: HTMLElement, elementType: NodeType): boolean {
  return isDescendantOfMarkdownElement(node, (type) => type === elementType);
}
function isChildOfMultilineMarkdownElement(node: HTMLElement): boolean {
  return isDescendantOfMarkdownElement(node, (type) => MULTILINE_MARKDOWN_TYPES.includes(type as NodeType));
}

export {
  addStyleToBlock,
  extendBlockStructure,
  isBlockMarkdownType,
  isMultilineMarkdownType,
  getFirstBlockMarkdownRange,
  isChildOfMarkdownElement,
  isChildOfMultilineMarkdownElement,
  MULTILINE_MARKDOWN_TYPES,
};
