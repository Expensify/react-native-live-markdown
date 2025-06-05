import type {PartialMarkdownStyle} from '../../styleUtils';

const spinnerDefaultStyles = {
  borderRadius: '50%',
  display: 'block',
  animationPlayState: 'paused',
};
const spinnerContainerDefaultStyles = {
  position: 'absolute',
  // This fixes a bug with scrollbar flashing when spinner is shown. Context: https://github.com/Expensify/react-native-live-markdown/pull/688#pullrequestreview-2891335403
  bottom: '1px',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

/** Creates animated loading spinner */
function createLoadingIndicator(url: string, markdownStyle: PartialMarkdownStyle) {
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

  return container;
}

// eslint-disable-next-line import/prefer-default-export
export {createLoadingIndicator};
