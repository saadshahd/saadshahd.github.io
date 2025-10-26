// Button Component Stories for Astrobook
import Button from "./Button.astro";

export default {
  component: Button,
};

// Primary variant stories
export const PrimarySmall = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Small Primary Button",
  },
};

export const PrimaryMedium = {
  args: {
    variant: "primary",
    size: "md",
    children: "Medium Primary Button",
  },
};

export const PrimaryLarge = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Large Primary Button",
  },
};

// Secondary variant stories
export const SecondarySmall = {
  args: {
    variant: "secondary",
    size: "sm",
    children: "Small Secondary Button",
  },
};

export const SecondaryMedium = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Medium Secondary Button",
  },
};

export const SecondaryLarge = {
  args: {
    variant: "secondary",
    size: "lg",
    children: "Large Secondary Button",
  },
};

// Link button stories
export const PrimaryLink = {
  args: {
    variant: "primary",
    size: "md",
    href: "/about",
    children: "Primary Link Button",
  },
};

export const SecondaryLink = {
  args: {
    variant: "secondary",
    size: "md",
    href: "/contact",
    children: "Secondary Link Button",
  },
};
