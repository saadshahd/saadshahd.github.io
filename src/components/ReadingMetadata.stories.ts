import type { StoryObj } from "@astrobook/types";

export default {
  title: "Content/ReadingMetadata",
  component: "ReadingMetadata",
  tags: ["autodocs"],
};

export const BlogPost: StoryObj = {
  args: {
    readingTime: "5 min",
  },
};

export const CaseStudy: StoryObj = {
  args: {
    readingTime: "25 min",
    sectionCount: 6,
  },
};

export const TechnicalAppendix: StoryObj = {
  args: {
    readingTime: "15 min",
    sectionCount: 3,
  },
};
