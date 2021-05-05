import { createContext } from "react";

const DEFAULT_CONTEXT = {
  theme: "dark",
};

export const GlobalContext = createContext(DEFAULT_CONTEXT);
