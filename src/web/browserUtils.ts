const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
const isChromium = 'chrome' in window;
const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;

export {isFirefox, isChromium, isSafari};
