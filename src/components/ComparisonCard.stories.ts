import type { StoryObj } from "@astrobook/types";

export default {
  title: "Content/ComparisonCard",
  component: "ComparisonCard",
  tags: ["autodocs"],
};

export const Before: StoryObj = {
  args: {
    variant: "before",
    title: "Engineering Bottleneck",
  },
  render: (args) => ({
    default: `
      <ComparisonCard variant="${args.variant}" title="${args.title}">
        <ul class="space-y-3">
          <li><strong>American football expansion:</strong> Scoped at 6 months engineering work, product blocked on roadmap</li>
          <li><strong>New event type:</strong> Deploy + regression testing required for every rule change</li>
          <li><strong>Support burden:</strong> Product managers fielded 50+ daily Slack questions about dataspec rules</li>
        </ul>
      </ComparisonCard>
    `,
  }),
};

export const After: StoryObj = {
  args: {
    variant: "after",
    title: "Configuration-Driven Scale",
  },
  render: (args) => ({
    default: `
      <ComparisonCard variant="${args.variant}" title="${args.title}">
        <ul class="space-y-3">
          <li><strong>NFL dataspecs shipped in 3 weeks:</strong> Product managers wrote drive rules, zero engineering involvement</li>
          <li><strong>New event type:</strong> JSON config + UI test, deployed same day through DSL system</li>
          <li><strong>Automated resolution:</strong> System answered 98% of dataspec questions, 5-person team handled only ambiguous 2%</li>
        </ul>
      </ComparisonCard>
    `,
  }),
};

export const Problem: StoryObj = {
  args: {
    variant: "problem",
    title: "The Challenge",
  },
  render: (args) => ({
    default: `
      <ComparisonCard variant="${args.variant}" title="${args.title}">
        <p>Manual coordination broke at 1000+ collectors. Product managers fielded 50+ daily questions while evolving the dataspec.</p>
      </ComparisonCard>
    `,
  }),
};

export const Solution: StoryObj = {
  args: {
    variant: "solution",
    title: "The Breakthrough",
  },
  render: (args) => ({
    default: `
      <ComparisonCard variant="${args.variant}" title="${args.title}">
        <p>Configuration-driven system answered 98% of questions automatically. 5-person team focused only on ambiguous edge cases.</p>
      </ComparisonCard>
    `,
  }),
};

export const SideBySide: StoryObj = {
  render: () => ({
    default: `
      <div class="grid md:grid-cols-2 gap-6">
        <ComparisonCard variant="before" title="Engineering Bottleneck">
          <ul class="space-y-3">
            <li><strong>American football expansion:</strong> Scoped at 6 months engineering work</li>
            <li><strong>Support burden:</strong> 50+ daily Slack questions</li>
          </ul>
        </ComparisonCard>
        <ComparisonCard variant="after" title="Configuration-Driven Scale">
          <ul class="space-y-3">
            <li><strong>NFL dataspecs shipped in 3 weeks:</strong> Zero engineering involvement</li>
            <li><strong>Automated resolution:</strong> System handled 98% of questions</li>
          </ul>
        </ComparisonCard>
      </div>
    `,
  }),
};
