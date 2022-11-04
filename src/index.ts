import * as api from "./api";
import * as handlers from "./handlers";

export const { createIndexRef, createThrottleRef } = api;
export const { vanilla } = handlers;
export default {
  ...api,
  ...handlers,
};
