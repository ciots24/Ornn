/**
 * Sample hooks from the 100+ Proven Winning Ad Hooks library.
 *
 * Grouped by the *job* the hook does, not by topic — that is what makes a
 * swipe file usable. A buyer with a pain-led offer reaches for the pain group;
 * someone with a number to show reaches for proof. An ungrouped list of fifty
 * lines is a wall you scroll past.
 *
 * Four per group, deliberately: the cards sit in a rail, and equal line counts
 * are what keep their bottoms level.
 *
 * The bracketed tokens are the whole point — they are what turns a headline
 * into a template. `HookSwipe` marks them in the brand red so the shape of
 * each line is readable at a glance, and each line copies to the clipboard.
 */

export type HookGroup = {
  id: string;
  name: string;
  /** What this group of hooks is *for*, in one line. */
  job: string;
  lines: readonly string[];
};

export const hookGroups: readonly HookGroup[] = [
  {
    id: "callout",
    name: "Callout",
    job: "Stops the exact person you want and lets everyone else scroll on.",
    lines: [
      "If you're still doing [outdated method], you need to watch this!",
      "Stop scrolling! If you love [thing], this is for YOU!",
      "If you want to start [X] but you're afraid of [Y]",
      "[Topic] explained for [group]",
    ],
  },
  {
    id: "pain",
    name: "Pain → fix",
    job: "Names the frustration out loud, then promises the way out.",
    lines: [
      "Tired of [pain point]? Here's the 1 tip that changed EVERYTHING",
      "Here's how to get [desired result] without doing [pain point]",
      "This is why you suck at [skill], and here's how to fix it",
      "Don't do [X], do [Y] for a better [outcome]",
    ],
  },
  {
    id: "curiosity",
    name: "Curiosity gap",
    job: "Opens a loop and refuses to close it until they've watched.",
    lines: [
      "What if I told you [you didn't have to do this thing] just to get [desired result]",
      "What NOBODY tells you about becoming a [position]",
      "You won't believe what goes on behind the scenes of [popular account]",
      "Watch until the end because I'm revealing something big & you don't want to miss it!",
    ],
  },
  {
    id: "proof",
    name: "Proof-led",
    job: "Leads with the number. Strongest when the number is real.",
    lines: [
      "How I'm making [₱X/month] just by [simple action]",
      "How to 10x your [metric] with this 1 simple [hack/trick]",
      "How [person/company] turned [action] into a [₱X million] [result]",
      "My foolproof daily plan for [desired result] in [short time frame]",
    ],
  },
  {
    id: "story",
    name: "Story",
    job: "Buys attention with a transformation before it asks for anything.",
    lines: [
      "What I learned going from ₱0 to [₱X] in 12 months selling [product]",
      "They said it couldn't be done… here's how I [impressive outcome] in just [time period]",
      "From rock bottom to rockstar… here's my against-all-odds comeback story",
      "I used to feel so [vulnerable emotion] until I…",
    ],
  },
];

/** Drives the "N of 100+" label, so editing the groups can't make it lie. */
export const hookSampleCount = hookGroups.reduce(
  (sum, group) => sum + group.lines.length,
  0,
);
