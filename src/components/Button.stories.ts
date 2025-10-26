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
  },
  slots: {
    default: "Small Primary Button",
  },
};

export const PrimaryMedium = {
  args: {
    variant: "primary",
    size: "md",
  },
  slots: {
    default: "Medium Primary Button",
  },
};

export const PrimaryLarge = {
  args: {
    variant: "primary",
    size: "lg",
  },
  slots: {
    default: "Large Primary Button",
  },
};

// Secondary variant stories
export const SecondarySmall = {
  args: {
    variant: "secondary",
    size: "sm",
  },
  slots: {
    default: "Small Secondary Button",
  },
};

export const SecondaryMedium = {
  args: {
    variant: "secondary",
    size: "md",
  },
  slots: {
    default: "Medium Secondary Button",
  },
};

export const SecondaryLarge = {
  args: {
    variant: "secondary",
    size: "lg",
  },
  slots: {
    default: "Large Secondary Button",
  },
};

// Link button stories
export const PrimaryLink = {
  args: {
    variant: "primary",
    size: "md",
    href: "/about",
  },
  slots: {
    default: "Primary Link Button",
  },
};

export const SecondaryLink = {
  args: {
    variant: "secondary",
    size: "md",
    href: "/contact",
  },
  slots: {
    default: "Secondary Link Button",
  },
};
