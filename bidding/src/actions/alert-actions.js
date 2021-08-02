import { DISMISS, FAILED, SUCCESS } from "./types";

export const success = (message) => {
  return { type: SUCCESS, message };
};
export const failed = (message) => {
  return { type: FAILED, message };
};
export const dissMessage = () => {
  return { type: DISMISS };
};
