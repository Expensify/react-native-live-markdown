import type {HTMLMarkdownElement, MarkdownTextInputElement} from '../../MarkdownTextInput.web';
import type {PartialMarkdownStyle} from '../../styleUtils';

const spinnerDefaultStyles = {
  borderRadius: '50%',
  display: 'block',
  animationPlayState: 'paused',
};
const spinnerContainerDefaultStyles = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const keyframes = [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}];

const options = {
  duration: 1000,
  iterations: Infinity,
};

/** Creates animated loading spinner */
function createLoadingIndicator(currentInput: MarkdownTextInputElement, url: string, markdownStyle: PartialMarkdownStyle) {
  // Get current spinner animation progress if it exists
  const currentSpinner = currentInput.querySelector(`[data-type="spinner"][data-url="${url}"]`)?.firstChild;
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
      ...spinnerDefaultStyles,
      border: `${spinnerBorderWidth}px solid ${String(spinnerStyles.secondaryColor)}`,
      borderTop: `${spinnerBorderWidth}px solid ${String(spinnerStyles.primaryColor)}`,
      width: spinnerStyles.width || '20px',
      height: spinnerStyles.height || '20px',
    });
  }

  const containerStyles = markdownStyle.loadingIndicatorContainer;
  Object.assign(container.style, {
    ...markdownStyle.loadingIndicatorContainer,
    ...spinnerContainerDefaultStyles,
    width: containerStyles?.width || 'auto',
    height: containerStyles?.height || 'auto',
  });

  container.setAttribute('data-type', 'spinner');
  container.setAttribute('data-url', url);
  container.contentEditable = 'false';
  container.appendChild(spinner);

  const animation2 = spinner.animate(keyframes, options);
  animation2.currentTime = currentTime;
  return container;
}

// eslint-disable-next-line import/prefer-default-export
export {createLoadingIndicator};
