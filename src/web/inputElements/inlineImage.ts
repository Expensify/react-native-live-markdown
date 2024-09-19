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

type DebouncePreviewItem = {
  timeout: NodeJS.Timeout;
  url: string;
};

const timeoutMap = new Map<string, DebouncePreviewItem>();

function getImagePreviewElement(targetElement: HTMLMarkdownElement) {
  return Array.from(targetElement?.childNodes || []).find((el) => (el as HTMLElement)?.contentEditable === 'false') as HTMLMarkdownElement | undefined;
}

function createImageElement(targetNode: TreeNode, url: string, callback: (img: HTMLElement, err?: string | Event) => void) {
  if (timeoutMap.has(targetNode.orderIndex)) {
    const mapItem = timeoutMap.get(targetNode.orderIndex);
    // Check if the image url has been changed, if not early return so the image can load asynchronously
    const currentElement = document.querySelector(`[data-type="block"][data-id="${targetNode.orderIndex}"]`) as HTMLMarkdownElement;
    if (mapItem?.url === url && currentElement && getImagePreviewElement(currentElement)) {
      return;
    }

    clearTimeout(mapItem?.timeout);
    timeoutMap.delete(targetNode.orderIndex);
  }

  const timeout = setTimeout(() => {
    const imageContainer = document.createElement('span');
    imageContainer.contentEditable = 'false';
    imageContainer.setAttribute('data-type', 'inline-container');

    const img = new Image();
    imageContainer.appendChild(img);

    img.contentEditable = 'false';
    img.onload = () => callback(imageContainer);
    img.onerror = (err) => callback(imageContainer, err);
    img.src = url;
    timeoutMap.delete(targetNode.orderIndex);
  }, INLINE_IMAGE_PREVIEW_DEBOUNCE_TIME_MS);
  timeoutMap.set(targetNode.orderIndex, {
    timeout,
    url,
  });
}

/** Adds already loaded image element from current input content to the tree node */
function updateImageTreeNode(targetNode: TreeNode, newElement: HTMLMarkdownElement, imageMarginTop = 0) {
  const paddingBottom = `${parseStringWithUnitToNumber(newElement.style.height) + imageMarginTop}px`;
  targetNode.element.appendChild(newElement.cloneNode(true));

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

  createImageElement(targetNode, imageHref, (imageContainer, err) => {
    let targetElement = targetNode.element;

    // Update the target element if input structure was updated while the image was loading and its content haven't changed
    if (!targetElement.isConnected) {
      const currentElement = currentInput.querySelector(`[data-type="block"][data-id="${targetNode.orderIndex}"]`) as HTMLMarkdownElement;

      const currentElementURL = getImagePreviewElement(currentElement)?.getAttribute('data-url');
      const targetElementURL = getImagePreviewElement(targetNode.element)?.getAttribute('data-url');
      if (currentElementURL && targetElementURL && currentElementURL === targetElementURL) {
        targetElement = currentElement;
      } else {
        return; // Cancel expired image preview if the content has changed befo
      }
    }

    // Verify if the current spinner is for the loaded image. If not, it means that the response came after the user changed the image url
    const currentSpinner = currentInput.querySelector(`[data-type="spinner"][data-url="${imageHref}"]`);

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

    targetElement.appendChild(imageContainer);

    const imageClientHeight = Math.max(img.clientHeight, imageContainer.clientHeight);
    Object.assign(imageContainer.style, {
      height: `${imageClientHeight}px`,
    });
    // Set paddingBottom to the height of the image so it's displayed under the block
    Object.assign(targetElement.style, {
      paddingBottom: `${imageClientHeight + imageMarginTop}px`,
    });
  });

  return targetNode;
}

function forceRefreshAllImages(currentInput: MarkdownTextInputElement) {
  currentInput.querySelectorAll('img').forEach((img) => {
    // force image reload only if broken image icon is displayed
    if (img.naturalWidth > 0) {
      return;
    }

    const url = img.src;
    // eslint-disable-next-line no-param-reassign
    img.src = `${url}#`;
  });
}

// eslint-disable-next-line import/prefer-default-export
export {addInlineImagePreview, forceRefreshAllImages};
