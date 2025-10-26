// Badge Component Stories for Astrobook
import Badge from "./Badge.astro";

export default {
  component: Badge,
};

// Skill variant badges
export const SkillBadge = {
  args: {
    variant: "skill",
  },
  slots: {
    default: "JavaScript",
  },
};

export const SkillBadgeMultiple = {
  args: {
    variant: "skill",
  },
  slots: {
    default: "TypeScript",
  },
};

export const SkillBadgeKafka = {
  args: {
    variant: "skill",
  },
  slots: {
    default: "Kafka",
  },
};

// Tech variant badges
export const TechBadge = {
  args: {
    variant: "tech",
  },
  slots: {
    default: "React",
  },
};

export const TechBadgeNode = {
  args: {
    variant: "tech",
  },
  slots: {
    default: "Node.js",
  },
};

// Status variant badges
export const StatusBadge = {
  args: {
    variant: "status",
  },
  slots: {
    default: "Active",
  },
};

export const StatusBadgeCompleted = {
  args: {
    variant: "status",
  },
  slots: {
    default: "Completed",
  },
};

// Badge with custom class
export const CustomSizedBadge = {
  args: {
    variant: "skill",
    class: "text-lg px-4 py-2",
  },
  slots: {
    default: "Large Badge",
  },
};
