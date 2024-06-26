const BrowserUtils = {
  isFirefox: navigator.userAgent.toLowerCase().includes('firefox'),
  isChromium: 'chrome' in window,

  /**
   * Whether the platform is a mobile browser.
   * Copied from Expensify App https://github.com/Expensify/App/blob/90dee7accae79c49debf30354c160cab6c52c423/src/libs/Browser/index.website.ts#L41
   *
   */
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Silk|Opera Mini/i.test(navigator.userAgent),
};

export default BrowserUtils;
