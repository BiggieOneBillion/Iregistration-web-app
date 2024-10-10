import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  border: "2px dashed", // change the appearance of the border
  borderRadius: 0, // remove the border radius
  fontWeight: "semibold", // change the font weight
});

const authSolid = defineStyle({
  color: "white",
  bg: "rgba(0,0,0,1)",
  _hover: {
    bg: "rgba(0,0,0,0.85)",
  },
});

const DeleteOutline = defineStyle({
  color: "rgba(255,0,0,0.7)",
  bg: "white",
  border: "1px solid rgba(255,0,0,0.7)",
  _hover: {
    borderColor: "rgba(255, 0, 0, 0.9)",
    color: "rgba(255,0,0,1)",
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { outline, authSolid, DeleteOutline },
});
