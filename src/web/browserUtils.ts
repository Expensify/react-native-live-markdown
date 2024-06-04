const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
const isChromium = 'chrome' in window;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Silk|Opera Mini/i.test(navigator.userAgent);

export {isFirefox, isChromium, isMobile};
