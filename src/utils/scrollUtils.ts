
export const smoothHorizontalScroll = (
  element: HTMLElement,
  start: number,
  target: number,
  duration: number
) => {
  const startTime = performance.now();
  const change = target - start;
  
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 
      ? 2 * t * t 
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };
  
  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const eased = easeInOutQuad(progress);
    
    element.scrollLeft = start + change * eased;
    
    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  
  requestAnimationFrame(animateScroll);
};
