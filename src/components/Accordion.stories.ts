// Accordion Component Stories for Astrobook
import Accordion from "./Accordion.astro";

export default {
  component: Accordion,
};

// Basic usage
export const Default = {
  args: {
    summary: "Click to expand content",
  },
  slots: {
    default:
      "<p>This is the collapsible content. It can contain any HTML or Astro components.</p>",
  },
};

// Code example (mirrors Statsbomb use case)
export const CodeExample = {
  args: {
    summary: "Example: Soccer Possession Rules",
  },
  slots: {
    default: `<pre><code class="language-yaml"># DSL rules for soccer possession
Derive event possession from events sequence:
  - carry team mine +
    ~ reception team mine
    ~ foul-committed team opponent
    ~ out team opponent

# Rule: Team possession (team-level aggregation)
# When: Team has active carry, foul-won, or ball out by opponent
# Derive: possession (spans all team durational facts)</code></pre>`,
  },
};

// Technical detail with JavaScript code
export const TechnicalDetail = {
  args: {
    summary: "30+ Keyboard Shortcuts: Muscle Memory Over Mouse Clicks",
  },
  slots: {
    default: `<pre><code class="language-javascript">// Context-aware keyboard mappings
const keyboardShortcuts = {
  'main-room': {
    't': 'Create new event (pass, shot, tackle)',
    'p': 'Add player to event',
    '/': 'Toggle video loop mode',
    '←→': 'Rewind/forward 5 seconds'
  },
  'freeze-frame': {
    't': 'Toggle team view (home/away)',
    '1-9': 'Select player by jersey number',
    'Enter': 'Confirm positions'
  }
};

// Same key 't', different meaning per context
bindShortcuts('main-room', keyboardShortcuts['main-room']);
bindShortcuts('freeze-frame', keyboardShortcuts['freeze-frame']);</code></pre>`,
  },
};

// Long content (tests scrolling and overflow)
export const LongContent = {
  args: {
    summary: "Long Article Section",
  },
  slots: {
    default: `<p>This is a longer content section that tests how the accordion handles substantial text. When you have multiple paragraphs, the smooth height animation should handle the expansion gracefully.</p>
<p>The accordion uses Motion One to measure the full content height dynamically using scrollHeight, then animates from 0px to that exact height. This ensures smooth animations regardless of content length.</p>
<p>After the animation completes, the height is reset to 'auto' so that dynamic content (like images loading or text reflow) can adjust naturally without breaking the layout.</p>
<p>This is the fourth paragraph demonstrating that the accordion can handle various amounts of content while maintaining the fast golden timing (0.382s) and Egyptian water easing for fluid reveals.</p>
<p>And finally, a fifth paragraph to really test the scrolling behavior and ensure everything works smoothly even with substantial content.</p>`,
  },
};

// Initially open
export const DefaultOpen = {
  args: {
    summary: "This starts expanded",
    defaultOpen: true,
  },
  slots: {
    default:
      "<p>Content visible on page load. This demonstrates the defaultOpen prop for cases where you want the accordion expanded by default.</p>",
  },
};

// Multiple accordions (tests independent behavior)
export const MultipleAccordions = {
  render: () => `
<div class="space-y-0">
  <Accordion summary="First Section">
    <p>First section content. Notice how multiple accordions can be open simultaneously - they operate independently.</p>
  </Accordion>
  <Accordion summary="Second Section">
    <p>Second section content. This demonstrates the independent behavior we specified in the design requirements.</p>
  </Accordion>
  <Accordion summary="Third Section">
    <p>Third section content. Each accordion maintains its own state without affecting others.</p>
  </Accordion>
</div>
  `,
};
