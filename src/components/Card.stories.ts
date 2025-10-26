// Card Component Stories for Astrobook
import Card from "./Card.astro";

export default {
  component: Card,
};

// Basic card
export const BasicCard = {
  args: {
    children:
      "This is a basic card with default styling from the Egyptian Engineering design system.",
  },
};

// Card with custom class
export const CardWithPadding = {
  args: {
    class: "p-8",
    children: "Card with extra padding (p-8 class)",
  },
};

// Card with rich content
export const RichContentCard = {
  args: {
    class: "p-6",
    children: `
      <h3 class="text-xl font-semibold mb-4">Card Title</h3>
      <p class="text-accent-light mb-4">
        This card demonstrates rich content with multiple elements.
        The Egyptian Engineering design system provides a limestone cream background
        with subtle shadows.
      </p>
      <div class="flex gap-2">
        <span class="px-3 py-1 bg-primary text-accent text-sm rounded-md">Tag 1</span>
        <span class="px-3 py-1 bg-secondary text-surface text-sm rounded-md">Tag 2</span>
      </div>
    `,
  },
};

// Narrow card
export const NarrowCard = {
  args: {
    class: "max-w-sm p-6",
    children: `
      <h4 class="font-semibold mb-2">Narrow Card</h4>
      <p class="text-neutral">Constrained width with max-w-sm</p>
    `,
  },
};

// Wide card
export const WideCard = {
  args: {
    class: "w-full p-6",
    children: `
      <h4 class="font-semibold mb-2">Wide Card</h4>
      <p class="text-neutral">Full width card spanning the container</p>
    `,
  },
};
