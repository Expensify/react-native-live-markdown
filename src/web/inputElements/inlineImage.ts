import type {HTMLMarkdownElement, MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import type {MarkdownRange} from '../../commonTypes';
import {parseStringWithUnitToNumber} from '../../styleUtils';
import type {PartialMarkdownStyle} from '../../styleUtils';
import type {TreeNode} from '../utils/treeUtils';
import {createLoadingIndicator} from './loadingIndicator';

const INLINE_IMAGE_PREVIEW_DEBOUNCE_TIME_MS = 300;

const inlineImageDefaultStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
};

let timeout: NodeJS.Timeout | null = null;

function createImageElement(url: string, callback: (img: HTMLElement, err?: string | Event) => void) {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    const imageContainer = document.createElement('span');
    imageContainer.contentEditable = 'false';
    imageContainer.setAttribute('data-type', 'inline-container');

    const img = new Image();
    imageContainer.appendChild(img);

    img.contentEditable = 'false';
    img.onload = () => callback(imageContainer);
    img.onerror = (err) => callback(imageContainer, err);
    img.src = url;
  }, INLINE_IMAGE_PREVIEW_DEBOUNCE_TIME_MS);
}

/** Adds already loaded image element from current input content to the tree node */
function updateImageTreeNode(targetNode: TreeNode, newElement: HTMLMarkdownElement, imageMarginTop = 0) {
  const paddingBottom = `${parseStringWithUnitToNumber(newElement.style.height) + imageMarginTop}px`;
  targetNode.element.appendChild(newElement);

  let currentParent = targetNode.element;
  while (currentParent.parentElement && !['line', 'block'].includes(currentParent.getAttribute('data-type') || '')) {
    currentParent = currentParent.parentElement as HTMLMarkdownElement;
  }
  Object.assign(currentParent.style, {
    paddingBottom,
  });

  return targetNode;
}

/** The main function that adds inline image preview to the node */
function addInlineImagePreview(currentInput: MarkdownTextInputElement, targetNode: TreeNode, text: string, ranges: MarkdownRange[], markdownStyle: PartialMarkdownStyle) {
  const linkRange = ranges.find((r) => r.type === 'link');
  let imageHref = '';
  if (linkRange) {
    imageHref = text.substring(linkRange.start, linkRange.start + linkRange.length);
  }

  const imageMarginTop = parseStringWithUnitToNumber(`${markdownStyle.inlineImage?.marginTop}`);
  const imageMarginBottom = parseStringWithUnitToNumber(`${markdownStyle.inlineImage?.marginBottom}`);

  // If the inline image markdown with the same href exists in the current input, use it instead of creating new one.
  // Prevents from image flickering and layout jumps
  const alreadyLoadedPreview = currentInput.querySelector(`img[src="${imageHref}"]`);
  const loadedImageContainer = alreadyLoadedPreview?.parentElement;

  if (loadedImageContainer && loadedImageContainer.getAttribute('data-type') === 'inline-container') {
    return updateImageTreeNode(targetNode, loadedImageContainer as HTMLMarkdownElement, imageMarginTop);
  }

  // Add a loading spinner
  const spinner = createLoadingIndicator(imageHref, markdownStyle);
  if (spinner) {
    targetNode.element.appendChild(spinner);
  }

  Object.assign(targetNode.element.style, {
    display: 'block',
    marginBottom: `${imageMarginBottom}px`,
    paddingBottom: markdownStyle.loadingIndicatorContainer?.height || markdownStyle.loadingIndicator?.height || (!!markdownStyle.loadingIndicator && '30px') || undefined,
  });

  createImageElement(imageHref, (imageContainer, err) => {
    // Verify if the current spinner is for the loaded image. If not, it means that the response came after the user changed the image url
    const currentSpinner = currentInput.querySelector('[data-type="spinner"]');
    // Remove the spinner
    if (currentSpinner) {
      currentSpinner.remove();
    }

    const img = imageContainer.firstChild as HTMLImageElement;
    const {minHeight, minWidth, maxHeight, maxWidth, borderRadius} = markdownStyle.inlineImage || {};
    const imgStyle = {
      minHeight,
      minWidth,
      maxHeight,
      maxWidth,
      borderRadius,
    };

    // Set the image styles
    Object.assign(imageContainer.style, {
      ...inlineImageDefaultStyles,
      ...(err && {
        ...imgStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),
    });

    Object.assign(img.style, !err && imgStyle);

    targetNode.element.appendChild(imageContainer);

    Object.assign(imageContainer.style, {
      height: `${imageContainer.clientHeight}px`,
    });
    // Set paddingBottom to the height of the image so it's displayed under the block
    Object.assign(targetNode.element.style, {
      paddingBottom: `${imageContainer.clientHeight + imageMarginTop}px`,
    });
  });

  return targetNode;
}

// eslint-disable-next-line import/prefer-default-export
export {addInlineImagePreview};
