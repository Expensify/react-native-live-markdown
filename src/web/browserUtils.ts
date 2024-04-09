const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
const isChromium = 'chrome' in window;

export {isFirefox, isChromium};
