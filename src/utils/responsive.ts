export function isTablet() {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isMobile() {
  return window.innerWidth < 768;
}
