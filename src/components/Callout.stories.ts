// Callout Component Stories for Astrobook
import Callout from "./Callout.astro";

export default {
  component: Callout,
};

// =============================================================================
// INSIGHT VARIANT (Gold - Architectural Wisdom)
// =============================================================================

export const InsightDefault = {
  args: {
    variant: "insight",
    size: "default",
    title: "Core Architectural Lesson",
  },
  slots: {
    default: `<p>Each system's constraints shaped the others. The DSL drove UI validation. State machines constrained invalid workflows. Metadata resolution enabled concurrent collection. Understanding how they connect reveals why separation creates leverage.</p>`,
  },
};

export const InsightCompact = {
  args: {
    variant: "insight",
    size: "compact",
    title: "Supporting Detail",
  },
  slots: {
    default: `<p>Reduced visual weight for less critical insights. Use when following a prominent callout.</p>`,
  },
};

export const InsightInline = {
  args: {
    variant: "insight",
    size: "inline",
    title: "Quick Note",
  },
  slots: {
    default: `<p>Minimal prominence for brief asides.</p>`,
  },
};

export const InsightWithoutIcon = {
  args: {
    variant: "insight",
    size: "default",
    title: "Without Icon",
    showIcon: false,
  },
  slots: {
    default: `<p>Icons can be hidden by setting showIcon={false}.</p>`,
  },
};

// =============================================================================
// CONTEXT VARIANT (Blue - Background/Domain)
// =============================================================================

export const ContextDefault = {
  args: {
    variant: "context",
    size: "default",
    title: "Prerequisites",
  },
  slots: {
    default: `<p>This appendix assumes you've read the <a href="#" class="text-secondary hover:text-secondary-dark underline">main case study</a>. It provides implementation details for engineers interested in DSL design, state machine architecture, and functional data pipelines.</p>`,
  },
};

export const ContextCompact = {
  args: {
    variant: "context",
    size: "compact",
    title: "Domain Background",
  },
  slots: {
    default: `<p>Soccer matches generate ~2000 events per game over 90 minutes. Collectors work in real-time while watching video.</p>`,
  },
};

export const ContextInline = {
  args: {
    variant: "context",
    size: "inline",
  },
  slots: {
    default: `<p>Brief contextual note without title.</p>`,
  },
};

// =============================================================================
// WARNING VARIANT (Amber - Trade-offs/Caution)
// =============================================================================

export const WarningDefault = {
  args: {
    variant: "warning",
    size: "default",
    title: "Trade-offs to Consider",
  },
  slots: {
    default: `<p>ANTLR added build complexity (Java dependency), but paid off when expanding to American football. Simple parser worked for soccer but couldn't handle complex conditional rules.</p>`,
  },
};

export const WarningCompact = {
  args: {
    variant: "warning",
    size: "compact",
    title: "Breaking Change",
  },
  slots: {
    default: `<p>This pattern requires migration of existing callouts. All callouts must specify size variant.</p>`,
  },
};

export const WarningInline = {
  args: {
    variant: "warning",
    size: "inline",
  },
  slots: {
    default: `<p>Deprecated API - use v2 instead.</p>`,
  },
};

// =============================================================================
// TECHNICAL VARIANT (Emerald - Code/Implementation)
// =============================================================================

export const TechnicalDefault = {
  args: {
    variant: "technical",
    size: "default",
    title: "System 1 of 3: Domain Logic as Configuration",
  },
  slots: {
    default: `<p><strong>Bounded context:</strong> Event collection dataspec</p>
<p>The DSL separated validation rules from execution logic. Product managers wrote declarative rules ("pass THEN reception"), which compiled to runtime constraints in the collection UI.</p>`,
  },
};

export const TechnicalCompact = {
  args: {
    variant: "technical",
    size: "compact",
    title: "Implementation Note",
  },
  slots: {
    default: `<p>YOLOv5 fine-tuned on 50k annotated soccer frames. Inference: ~200ms GPU, ~1.5s CPU.</p>`,
  },
};

export const TechnicalInline = {
  args: {
    variant: "technical",
    size: "inline",
  },
  slots: {
    default: `<p>TypeScript 4.9+ required for satisfies operator.</p>`,
  },
};

// =============================================================================
// SUBTLE VARIANT (Neutral - Low-priority Notes)
// =============================================================================

export const SubtleDefault = {
  args: {
    variant: "subtle",
    size: "default",
    title: "Optional Enhancement",
  },
  slots: {
    default: `<p>For additional performance optimization, consider memoizing this calculation. Impact is minimal (~2ms) but may matter at scale.</p>`,
  },
};

export const SubtleCompact = {
  args: {
    variant: "subtle",
    size: "compact",
  },
  slots: {
    default: `<p>Subtle variant works best for footnote-style content.</p>`,
  },
};

export const SubtleInline = {
  args: {
    variant: "subtle",
    size: "inline",
  },
  slots: {
    default: `<p>No icon for subtle variant by design.</p>`,
  },
};

// =============================================================================
// VISUAL RHYTHM EXAMPLES
// =============================================================================

export const VisualRhythmExample = {
  args: {
    variant: "insight",
    size: "default",
    title: "First Callout (Prominent)",
  },
  slots: {
    default: `<p>Start with a prominent callout for core insights. Use default size with title.</p>
<div class="mt-6 space-y-6">
  <aside class="rounded-lg p-4 border-l-3 bg-[#EFF6FF] border-[#0EA5E9] text-sm">
    <div class="font-semibold text-text mb-3 text-base flex items-center gap-2">
      <span>Second Callout (Context, Compact)</span>
    </div>
    <div class="text-text-lighter leading-relaxed">
      <p>Alternate to cool blue context. Use compact size to reduce visual weight.</p>
    </div>
  </aside>
  <aside class="rounded-lg p-6 border-l-4 bg-[#ECFDF5] border-[#10B981]">
    <div class="font-semibold text-text mb-3 text-base flex items-center gap-2">
      <span>Third Callout (Technical, Default)</span>
    </div>
    <div class="text-text-lighter leading-relaxed">
      <p>Back to default size for technical details. Pattern: warm (gold) → cool (blue) → cool (emerald).</p>
    </div>
  </aside>
</div>`,
  },
};
