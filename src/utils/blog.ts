type BadgeVariant = "skill" | "category" | "status";

interface TagConfig {
  label: string;
  variant: BadgeVariant;
}

const TAG_CONFIG: Record<string, TagConfig> = {
  ai: { label: "Coding Agents", variant: "skill" },
  engineering: { label: "Engineering Culture", variant: "category" },
};

const DEFAULT_CONFIG: TagConfig = { label: "", variant: "category" };

export function readingTime(body: string): string {
  const words = body.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 238))} min`;
}

export function mapTagToBadge(tag: string): TagConfig {
  const config = TAG_CONFIG[tag] ?? DEFAULT_CONFIG;
  return {
    label: config.label || tag,
    variant: config.variant,
  };
}
