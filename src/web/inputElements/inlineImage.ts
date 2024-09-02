import type {HTMLMarkdownElement, MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import type {MarkdownRange} from '../../commonTypes';
import {parseStyleToNumber} from '../../styleUtils';
import type {PartialMarkdownStyle} from '../../styleUtils';
import type {TreeNode} from '../utils/treeUtils';
import {createLoadingIndicator} from './loadingIndicator';

const inlineImageDefaultStyles = {
  backgroundPosition: `bottom left`,
  backgroundRepeat: `no-repeat`,
};

function getImageMeta(url: string, callback: (err: string | Event | null, img?: HTMLImageElement) => void) {
  const img = new Image();
  img.onload = () => callback(null, img);
  img.onerror = (err) => callback(err);
  img.src = url;
}

/** Replaces element in the tree, that is beeing builded, with the element from the currently rendered input (with previous state) */
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

/** The main function that adds inline image preview to the node */
function addInlineImagePreview(currentInput: MarkdownTextInputElement, targetNode: TreeNode, text: string, ranges: MarkdownRange[], markdownStyle: PartialMarkdownStyle) {
  const linkRange = ranges.find((r) => r.type === 'link');
  let imageHref = '';
  if (linkRange) {
    imageHref = text.substring(linkRange.start, linkRange.start + linkRange.length);
  }

  // If the inline image markdown with the same href is already loaded, replace the targetNode with the already loaded preview
  const alreadyLoadedPreview = currentInput.querySelector(`[data-image-href="${imageHref}"]`);
  if (alreadyLoadedPreview) {
    return replaceElementInTreeNode(targetNode, alreadyLoadedPreview as HTMLMarkdownElement);
  }

  // Add a loading spinner
  const spinner = createLoadingIndicator(currentInput, imageHref, markdownStyle);
  if (spinner) {
    targetNode.element.appendChild(spinner);
  }

  const maxWidth = parseStyleToNumber(`${markdownStyle.inlineImage?.maxWidth}`);
  const maxHeight = parseStyleToNumber(`${markdownStyle.inlineImage?.maxHeight}`);
  const imageMarginTop = parseStyleToNumber(`${markdownStyle.inlineImage?.marginTop}`);
  const imageMarginBottom = parseStyleToNumber(`${markdownStyle.inlineImage?.marginBottom}`);

  Object.assign(targetNode.element.style, {
    display: 'block',
    marginBottom: `${imageMarginBottom}px`,
    paddingBottom: markdownStyle.loadingIndicatorContainer?.height || markdownStyle.loadingIndicator?.height || (!!markdownStyle.loadingIndicator && '30px') || undefined,
  });

  getImageMeta(imageHref, (_err, img) => {
    if (!img || _err) {
      return;
    }

    // Verify if the current spinner is for the loaded image. If not, it means that the response came after the user changed the image url
    const currentSpinner = currentInput.querySelector('[data-type="spinner"]');
    if (currentSpinner !== spinner) {
      return;
    }

    // Remove the spinner
    if (currentSpinner) {
      currentSpinner.remove();
    }

    targetNode.element.setAttribute('data-image-href', imageHref);

    // Calcate the image preview size and apply styles
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
      ...inlineImageDefaultStyles,
      backgroundImage: `url("${imageHref}")`,
      backgroundSize: `${widthSize} ${heightSize}`,
      paddingBottom: `${imageMarginTop + paddingValue}px`,
    });
  });

  return targetNode;
}

// eslint-disable-next-line import/prefer-default-export
export {addInlineImagePreview};
