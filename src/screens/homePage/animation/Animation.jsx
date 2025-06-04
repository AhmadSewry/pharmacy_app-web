import { keyframes } from "@emotion/react";

export const flipHorizontalBottom = keyframes`
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(-180deg);
  }
`;

/*
  ---
  animation text-pop-up-top
  ---
*/

export const textPopUpTop = keyframes`
  0% {
    transform: translateY(0);
    transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    transform: translateY(-10px);
    transform-origin: 50% 50%;
    text-shadow: 
      0 1px 0 #000, 
      0 2px 0 #000, 
      0 3px 0 #000,
      0 4px 0 #000,
      0 5px 0 #000, 
      0 6px 0 #000, 
      0 7px 0 #000, 
      0 8px 0 #000;
  }
`;

export const slideInBottom = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideInRight = keyframes`
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;
