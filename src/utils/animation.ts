import { animate, stagger } from 'animejs';

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const animateFadeUp = (
  targets: any,
  options: { delay?: number; duration?: number; translateY?: number } = {}
) => {
  if (isReducedMotion() || !targets) return null;
  try {
    return animate(targets, {
      opacity: [0.3, 1],
      translateY: [options.translateY ?? 15, 0],
      duration: options.duration ?? 500,
      delay: options.delay ?? 0,
      ease: 'outCubic',
    });
  } catch {
    return null;
  }
};

export const animateScaleIn = (
  targets: any,
  options: { delay?: number; duration?: number; scale?: number } = {}
) => {
  if (isReducedMotion() || !targets) return null;
  try {
    return animate(targets, {
      opacity: [0.4, 1],
      scale: [options.scale ?? 0.96, 1],
      duration: options.duration ?? 600,
      delay: options.delay ?? 0,
      ease: 'outQuad',
    });
  } catch {
    return null;
  }
};

export const animateStaggerList = (
  targets: any,
  options: { delay?: number; staggerMs?: number; duration?: number } = {}
) => {
  if (isReducedMotion() || !targets) return null;
  try {
    return animate(targets, {
      opacity: [0.3, 1],
      translateY: [10, 0],
      duration: options.duration ?? 400,
      delay: stagger(options.staggerMs ?? 40, { start: options.delay ?? 30 }),
      ease: 'outCubic',
    });
  } catch {
    return null;
  }
};

export const animateSlideDown = (
  targets: any,
  options: { delay?: number; duration?: number } = {}
) => {
  if (isReducedMotion() || !targets) return null;
  try {
    return animate(targets, {
      opacity: [0.3, 1],
      translateY: [-10, 0],
      duration: options.duration ?? 450,
      delay: options.delay ?? 0,
      ease: 'outCubic',
    });
  } catch {
    return null;
  }
};
