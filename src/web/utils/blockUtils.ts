import type {HTMLMarkdownElement} from '../../MarkdownTextInput.web';
import type {PartialMarkdownStyle} from '../../styleUtils';
import type {MarkdownRange} from './parserUtils';
import type {NodeType, TreeNode} from './treeUtils';

function parseStyleToNumber(style: string | null) {
  return style ? parseInt(style.replace('px', ''), 10) : 0;
}

function addStyleToBlock(targetElement: HTMLElement, type: NodeType, markdownStyle: PartialMarkdownStyle) {
  const node = targetElement;
  switch (type) {
    case 'line':
      Object.assign(node.style, {
        display: 'block',
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
      Object.assign(node.style, markdownStyle.code);
      break;
    case 'pre':
      Object.assign(node.style, markdownStyle.pre);
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
    default:
      break;
  }
}

function createLoadingIndicator(url: string, markdownStyle: PartialMarkdownStyle) {
  // Get current spinner animation progress if it exists
  const currentSpinner = document.querySelector('[data-type="spinner"]')?.firstChild;
  let currentTime: CSSNumberish = 0;
  if (currentSpinner) {
    const animation = (currentSpinner as HTMLMarkdownElement).getAnimations()[0];
    if (animation) {
      currentTime = animation.currentTime || 0;
    }
  }

  const container = document.createElement('span');
  container.contentEditable = 'false';

  const spinner = document.createElement('span');
  const spinnerStyles = markdownStyle.loadingIndicator;
  if (spinnerStyles) {
    const spinnerBorderWidth = spinnerStyles.borderWidth || 3;
    Object.assign(spinner.style, {
      border: `${spinnerBorderWidth}px solid ${String(spinnerStyles.secondaryColor)}`,
      borderTop: `${spinnerBorderWidth}px solid ${String(spinnerStyles.primaryColor)}`,
      borderRadius: '50%',
      width: spinnerStyles.width || '20px',
      height: spinnerStyles.height || '20px',
      display: 'block',
      animationPlayState: 'paused',
    });
  }

  container.setAttribute('data-type', 'spinner');
  container.setAttribute('data-url', url);
  const containerStyles = markdownStyle.loadingIndicatorContainer;
  Object.assign(container.style, {
    ...markdownStyle.loadingIndicatorContainer,
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: containerStyles?.width || 'auto',
    height: containerStyles?.height || 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
  container.contentEditable = 'false';
  container.appendChild(spinner);

  const keyframes = [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}];

  const options = {
    duration: 1000,
    iterations: Infinity,
  };
  const animation2 = spinner.animate(keyframes, options);
  animation2.currentTime = currentTime;
  return container;
}

const BLOCK_MARKDOWN_TYPES = ['inline-image'];

function isBlockMarkdownType(type: NodeType) {
  return BLOCK_MARKDOWN_TYPES.includes(type);
}

function getFirstBlockMarkdownRange(ranges: MarkdownRange[]) {
  const blockMarkdownRange = ranges.find((r) => isBlockMarkdownType(r.type) || r.type === 'blockquote');
  return blockMarkdownRange?.type === 'blockquote' ? undefined : blockMarkdownRange;
}

function extendBlockStructure(
  inputElement: HTMLMarkdownElement,
  targetNode: TreeNode,
  currentRange: MarkdownRange,
  ranges: MarkdownRange[],
  text: string,
  markdownStyle: PartialMarkdownStyle,
) {
  switch (currentRange.type) {
    case 'inline-image':
      return addInlineImagePreview(inputElement, targetNode, text, ranges, markdownStyle);
    default:
      break;
  }

  return targetNode;
}

function replaceElementInTreeNode(targetNode: TreeNode, newElement: HTMLMarkdownElement) {
  // Clear newElement from its children
  [...newElement.children].forEach((child) => {
    child.remove();
  });
  newElement.remove();

  // Move all children from targetNode to newElement
  [...targetNode.element.children].forEach((child) => {
    newElement.appendChild(child);
  });
  targetNode.element.remove();

  targetNode.parentNode?.element.appendChild(newElement);
  return {...targetNode, element: newElement};
}

function getImageMeta(url: string, callback: (err: string | Event | null, img?: HTMLImageElement) => void) {
  const img = new Image();
  img.onload = () => callback(null, img);
  img.onerror = (err) => callback(err);
  img.src = url;
}

function addInlineImagePreview(inputElement: HTMLMarkdownElement, targetNode: TreeNode, text: string, ranges: MarkdownRange[], markdownStyle: PartialMarkdownStyle) {
  const linkRange = ranges.find((r) => r.type === 'link');
  let imageHref = '';
  if (linkRange) {
    imageHref = text.substring(linkRange.start, linkRange.start + linkRange.length);
  }

  // If the inline image markdown with the same href is already loaded, replace the targetNode with the already loaded preview
  const alreadyLoadedPreview = inputElement.querySelector(`[data-image-href="${imageHref}"]`);
  if (alreadyLoadedPreview) {
    return replaceElementInTreeNode(targetNode, alreadyLoadedPreview as HTMLMarkdownElement);
  }

  const spinner = createLoadingIndicator(imageHref, markdownStyle);
  if (spinner) {
    targetNode.element.appendChild(spinner);
  }

  const maxWidth = parseStyleToNumber(`${markdownStyle.inlineImage?.maxWidth}`) || 0;
  const maxHeight = parseStyleToNumber(`${markdownStyle.inlineImage?.maxHeight}`) || 0;
  const imageMarginTop = parseStyleToNumber(`${markdownStyle.inlineImage?.marginTop}`) || 0;
  const imageMarginBottom = parseStyleToNumber(`${markdownStyle.inlineImage?.marginBottom}`) || 0;

  Object.assign(targetNode.element.style, {
    display: 'block',
    marginBottom: `${imageMarginBottom}px`,
    paddingBottom: markdownStyle.loadingIndicatorContainer?.height || markdownStyle.loadingIndicator?.height || (!!markdownStyle.loadingIndicator && '30px') || undefined,
  });

  getImageMeta(imageHref, (_err, img) => {
    if (!img) {
      return;
    }

    const currentSpinner = inputElement.querySelector('[data-type="spinner"]');
    if (currentSpinner !== spinner) {
      return;
    }

    if (currentSpinner) {
      currentSpinner.remove();
      spinner.remove();
    }

    targetNode.element.setAttribute('data-image-href', imageHref);

    const {naturalWidth, naturalHeight} = img;
    let width: number | null = null;
    let height: number | null = null;

    let paddingValue = 0;
    if (naturalWidth > naturalHeight) {
      width = Math.min(maxWidth, naturalWidth);
      paddingValue = (width / naturalWidth) * naturalHeight;
    } else {
      height = Math.min(maxHeight, naturalHeight);
      paddingValue = height;
    }

    const widthSize = width ? `${width}px` : 'auto';
    const heightSize = height ? `${height}px` : 'auto';

    Object.assign(targetNode.element.style, {
      backgroundImage: `url("${imageHref}")`,
      backgroundPosition: `bottom left`,
      backgroundSize: `${widthSize} ${heightSize}`,
      backgroundRepeat: `no-repeat`,
      paddingBottom: `${imageMarginTop + paddingValue}px`,
    });
  });

  return targetNode;
}

export {addStyleToBlock, extendBlockStructure, isBlockMarkdownType, getFirstBlockMarkdownRange};
