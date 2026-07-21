import { type Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const createContainerVariants = (staggerChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren },
  },
});

export const createSlideUpVariants = (duration = 0.5, y = 20): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE_OUT },
  },
});

export const createScaleVariants = (duration = 0.3, scale = 0.9): Variants => ({
  hidden: { opacity: 0, scale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: EASE_OUT },
  },
});
