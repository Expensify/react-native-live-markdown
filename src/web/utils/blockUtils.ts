import type {InlineImagesInputProps, MarkdownRange, MarkdownType} from '../../commonTypes';
import type {MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import {parseStringWithUnitToNumber} from '../../styleUtils';
import type {PartialMarkdownStyle} from '../../styleUtils';
import {addInlineImagePreview} from '../inputElements/inlineImage';
import BrowserUtils from './browserUtils';
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

  const defaultPrePadding = markdownStyle.pre?.padding ?? 2;
  const preHorizontalPadding = parseStringWithUnitToNumber(markdownStyle.pre?.paddingHorizontal ?? defaultPrePadding).toString();
  const preVerticalPadding = parseStringWithUnitToNumber(markdownStyle.pre?.paddingVertical ?? defaultPrePadding).toString();

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
      // In multiline style the pre block using pseudoelements, otherwise default to inline
      if (isMultiline) {
        Object.assign(node.style, {
          ...markdownStyle.pre,
          backgroundColor: undefined,
          borderColor: undefined,
          borderWidth: undefined,
          borderStyle: undefined,
          padding: 0,
        });
        Object.assign((node.parentNode as HTMLElement).style, {
          padding: `${preVerticalPadding}px ${preHorizontalPadding}px`,
          'line-height': BrowserUtils.isMobile ? 1.3 : 'inherit',
          position: 'relative',
          width: 'fit-content',
          maxWidth: '100%',
          boxSizing: 'border-box',
          zIndex: 2,
          display: 'block',
        });
      } else {
        Object.assign(node.style, {
          ...markdownStyle.code,
          padding: `${codeVerticalPadding}px ${codeHorizontalPadding}px`,
          lineHeight: 1.5,
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

function getTopParentTreeNode(node: TreeNode) {
  let currentParentNode = node.parentNode;
  while (currentParentNode && ['text', 'br', 'line', 'syntax'].includes(currentParentNode.parentNode?.type || '')) {
    currentParentNode = currentParentNode?.parentNode || null;
  }
  return currentParentNode;
}

function isChildOfMarkdownElement(node: HTMLElement, elementType: MarkdownType): boolean {
  let currentNode = node.parentNode;
  while (currentNode && (currentNode as HTMLElement)?.contentEditable !== 'true') {
    if ((currentNode as HTMLElement)?.getAttribute?.('data-type') === elementType) {
      return true;
    }
    currentNode = currentNode.parentNode;
  }
  return false;
}

export {addStyleToBlock, extendBlockStructure, isBlockMarkdownType, getFirstBlockMarkdownRange, getTopParentTreeNode, isMultilineMarkdownType, MULTILINE_MARKDOWN_TYPES};
