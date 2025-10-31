import type { StoryObj } from "@astrobook/types";

export default {
  title: "Content/MetricCard",
  component: "MetricCard",
  tags: ["autodocs"],
};

export const SkillVariant: StoryObj = {
  args: {
    variant: "skill",
    value: "99%",
    label: "Error prevention through linting",
    description:
      "Automated validation caught mistakes before they became data quality issues",
  },
};

export const CategoryVariant: StoryObj = {
  args: {
    variant: "category",
    value: "~20s",
    label: "Event collection latency",
    description:
      "Coaches received detailed match analytics in near real-time to adjust tactics during live matches",
  },
};

export const StatusVariant: StoryObj = {
  args: {
    variant: "status",
    value: "10x",
    label: "Collector scaling (100 → 1000+)",
    description: "Non-linear leverage without proportional staffing increases",
  },
};

export const Grid: StoryObj = {
  render: () => ({
    default: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          variant="status"
          value="99%"
          label="Error prevention through linting"
          description="Automated validation caught mistakes before they became data quality issues"
        />
        <MetricCard
          variant="category"
          value="~20s"
          label="Event collection latency"
          description="Coaches received detailed match analytics in near real-time to adjust tactics during live matches"
        />
        <MetricCard
          variant="skill"
          value="10x"
          label="Collector scaling (100 → 1000+)"
          description="Non-linear leverage without proportional staffing increases"
        />
      </div>
    `,
  }),
};
