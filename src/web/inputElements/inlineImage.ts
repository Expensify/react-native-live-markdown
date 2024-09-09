import type {HTMLMarkdownElement, MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import type {MarkdownRange} from '../../commonTypes';
import {parseStyleToNumber} from '../../styleUtils';
import type {PartialMarkdownStyle} from '../../styleUtils';
import type {TreeNode} from '../utils/treeUtils';
import {createLoadingIndicator} from './loadingIndicator';

const inlineImageDefaultStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
};

function createImageElement(url: string, callback: (img: HTMLElement) => void) {
  const imageContainer = document.createElement('span');
  imageContainer.contentEditable = 'false';
  imageContainer.setAttribute('data-type', 'inline-container');

  const img = new Image();
  imageContainer.appendChild(img);

  img.contentEditable = 'false';
  img.onload = () => callback(imageContainer);
  img.onerror = () => callback(imageContainer);
  img.src = url;
}

/** Adds already loaded image element from current input content to the tree node */
function updateImageTreeNode(targetNode: TreeNode, newElement: HTMLMarkdownElement) {
  const paddingBottom = `${newElement.style.height}`;
  targetNode.element.appendChild(newElement);
  Object.assign(targetNode.element.style, {
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

  // If the inline image markdown with the same href exists in the current input, use it instead of creating new one.
  // Prevents from image flickering and layout jumps
  const alreadyLoadedPreview = currentInput.querySelector(`img[src="${imageHref}"]`);
  const loadedImageContainer = alreadyLoadedPreview?.parentElement;
  if (loadedImageContainer && loadedImageContainer.getAttribute('data-type') === 'inline-container') {
    return updateImageTreeNode(targetNode, loadedImageContainer as HTMLMarkdownElement);
  }

  // Add a loading spinner
  const spinner = createLoadingIndicator(currentInput, imageHref, markdownStyle);
  if (spinner) {
    targetNode.element.appendChild(spinner);
  }

  const maxWidth = markdownStyle.inlineImage?.maxWidth;
  const maxHeight = markdownStyle.inlineImage?.maxHeight;
  const imageMarginTop = parseStyleToNumber(`${markdownStyle.inlineImage?.marginTop}`);
  const imageMarginBottom = parseStyleToNumber(`${markdownStyle.inlineImage?.marginBottom}`);

  Object.assign(targetNode.element.style, {
    display: 'block',
    marginBottom: `${imageMarginBottom}px`,
    paddingBottom: markdownStyle.loadingIndicatorContainer?.height || markdownStyle.loadingIndicator?.height || (!!markdownStyle.loadingIndicator && '30px') || undefined,
  });

  createImageElement(imageHref, (imageContainer) => {
    // Verify if the current spinner is for the loaded image. If not, it means that the response came after the user changed the image url
    const currentSpinner = currentInput.querySelector('[data-type="spinner"]');
    // Remove the spinner
    if (currentSpinner) {
      currentSpinner.remove();
    }

    // Set the image styles
    Object.assign(imageContainer.style, {
      ...inlineImageDefaultStyles,
      maxHeight,
      maxWidth,
    });

    const img = imageContainer.firstChild as HTMLImageElement;
    Object.assign(img.style, {
      maxHeight,
      maxWidth,
    });

    targetNode.element.appendChild(imageContainer);

    const imageHeight = `${imageContainer.clientHeight + imageMarginTop}px`;
    Object.assign(imageContainer.style, {
      height: imageHeight,
    });
    // Set paddingBottom to the height of the image so it's displayed under the block
    Object.assign(targetNode.element.style, {
      paddingBottom: imageHeight,
    });
  });

  return targetNode;
}

// eslint-disable-next-line import/prefer-default-export
export {addInlineImagePreview};
