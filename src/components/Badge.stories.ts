// Badge Component Stories for Astrobook
import Badge from "./Badge.astro";

export default {
  component: Badge,
};

// Skill variant badges
export const SkillBadge = {
  args: {
    variant: "skill",
    children: "JavaScript",
  },
};

export const SkillBadgeMultiple = {
  args: {
    variant: "skill",
    children: "TypeScript",
  },
};

export const SkillBadgeKafka = {
  args: {
    variant: "skill",
    children: "Kafka",
  },
};

// Tech variant badges
export const TechBadge = {
  args: {
    variant: "tech",
    children: "React",
  },
};

export const TechBadgeNode = {
  args: {
    variant: "tech",
    children: "Node.js",
  },
};

// Status variant badges
export const StatusBadge = {
  args: {
    variant: "status",
    children: "Active",
  },
};

export const StatusBadgeCompleted = {
  args: {
    variant: "status",
    children: "Completed",
  },
};

// Badge with custom class
export const CustomSizedBadge = {
  args: {
    variant: "skill",
    class: "text-lg px-4 py-2",
    children: "Large Badge",
  },
};

// Collection of badges (simulating typical usage)
export const BadgeCollection = {
  args: {
    variant: "skill",
    children: `
      <div class="flex flex-wrap gap-2">
        Rust
      </div>
    `,
  },
};
