import type {HTMLMarkdownElement, MarkdownTextInputElement} from '../../MarkdownTextInput';

const ANIMATED_ELEMENT_TYPES = ['spinner'] as const;

type AnimatedElementType = (typeof ANIMATED_ELEMENT_TYPES)[number];

type AnimationTimes = {
  [key in AnimatedElementType]?: CSSNumberish[];
};

const KEYFRAMES: {
  [key in AnimatedElementType]?: Keyframe[];
} = {
  spinner: [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}],
};

const OPTIONS: {[key in AnimatedElementType]?: KeyframeAnimationOptions} = {
  spinner: {
    duration: 1000,
    iterations: Infinity,
  },
};

/** Gets the current times of all animated elements inside the input */
function getAnimationCurrentTimes(currentInput: MarkdownTextInputElement): AnimationTimes {
  const animationTimes: AnimationTimes = {};

  ANIMATED_ELEMENT_TYPES.forEach((type) => {
    const elements = currentInput.querySelectorAll(`[data-type="${type}"]`);
    animationTimes[type] = Array.from(elements).map((element) => {
      const animation = (element.firstChild as HTMLMarkdownElement).getAnimations()[0];
      if (animation) {
        return animation.currentTime || 0;
      }
      return 0;
    });
  });

  return animationTimes;
}

/** Updates the current times of all animated elements inside the input, to preserve their state between input rerenders */
function updateAnimationsTime(currentInput: MarkdownTextInputElement, animationTimes: AnimationTimes) {
  ANIMATED_ELEMENT_TYPES.forEach((type) => {
    const elements = currentInput.querySelectorAll(`[data-type="${type}"]`);
    if (!KEYFRAMES[type]) {
      return;
    }

    elements.forEach((element, index) => {
      const animation = (element.firstChild as HTMLMarkdownElement).animate(KEYFRAMES[type] as Keyframe[], OPTIONS[type]);
      if (animationTimes?.[type] && animation) {
        animation.currentTime = animationTimes[type]?.[index] || 0;
      }
    });
  });
}

export {getAnimationCurrentTimes, updateAnimationsTime};
