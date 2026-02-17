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

export function excerpt(body: string, maxLength = 160): string {
  const plain = body
    .replace(/^import\s.+$/gm, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_`~>]/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

  const firstParagraph = plain.split("\n")[0] ?? "";

  if (firstParagraph.length <= maxLength) return firstParagraph;

  const truncated = firstParagraph.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace)}…`;
}

export function mapTagToBadge(tag: string): TagConfig {
  const config = TAG_CONFIG[tag] ?? DEFAULT_CONFIG;
  return {
    label: config.label || tag,
    variant: config.variant,
  };
}
