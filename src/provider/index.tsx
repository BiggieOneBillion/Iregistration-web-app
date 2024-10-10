import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "../libs/chakra-ui/buttonTheme";

export const theme = extendTheme({
  components: { Button: buttonTheme },
})

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
