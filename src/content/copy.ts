/**
 * All page copy lives here. Sections render it — they don't own it.
 * Prose is stored as an array of lines: each line becomes its own paragraph,
 * which is what gives the sales letter its short, punchy rhythm.
 */

export type Prose = readonly string[];

export const hero = {
  eyebrow: "Para sa mga Self-Made Business Owners na sawa na sa paluging ads…",
  headline: {
    lead: "This",
    marked: "₱300/Day",
    rest: "AI-Powered Ads Strategy Turned a Small Local Business into a ₱10M/mo Brand in Less Than a Year",
  },
  subhead:
    "This works even if your business is new and you've never run Meta ads before.",
  cta: "Access the Ads2Sawa System",
  trust: [
    "Built on ₱100M+ in ad spend",
    "Starts at ₱300/day",
    "One-time payment",
  ],
} as const;

export const outcomes = [
  {
    icon: "script",
    title: "Generate sales-focused Meta ad copy in minutes",
    body: "Proven script framework 'to mula sa ₱100M+ ad spend. Hindi mo na kailangang magsunog ng budget para matutunan kung ano ang gumagana. Diretso ka na sa winning ads.",
  },
  {
    icon: "image",
    title: "Create 10 scroll-stopping image ads in one hour",
    body: "Walang designer. Libre pa. Magmumukhang kasing-laki mo ng malalaking brand.",
  },
  {
    icon: "rocket",
    title: "Launch on a proven ₱300–₱500 per day campaign structure",
    body: "Kaya 'yan ng kahit sino. Ang pinagkaiba? Ito mismo ang exact strategy na nag-close ng 37 clients in two weeks.",
  },
  {
    icon: "fastForward",
    title: "Skip years of expensive ads trial and error",
    body: "Start with the strategies, frameworks, and lessons we already paid ₱100M+ to discover.",
  },
] as const;

export const story = {
  eyebrow: "The origin",
  title: "What I learned after helping a client scale on ₱100M+ in ad spend",
  partOne: [
    "Hi, I'm JB.",
    "For years, I've been helping businesses grow for a living. Not with big budgets. Kundi sa updated and strategic advertising.",
    "It started with one client. A car dealership. Walang nakakakilala noon.",
    "Ads lang ang inaasahan namin para kumuha ng clients. Walang malaking budget. No name. No trust. Walang leads, walang rich relatives.",
    "So I tested with our ads. Then tested again. Araw-araw. Sunog ng budget, sunog ng oras.",
    "Then one ad hit. Tapos isa pa. Tapos isa pa.",
  ],
  partTwo: [
    "After a few weeks, may winning ads na kami na umaabot ng ₱1M+ profit per month.",
    "Five years later, isa na sila sa mga top car dealership sa bansa with more than ₱10M in gross sales per month, consistently.",
    "Dun ko na-realize…",
  ],
  requirements: [
    "Kailangan mo ng data.",
    "It means mamumuhunan ka talaga sa pagsunog ng budget.",
    "Need mo mag-test ng maraming creatives para mahanap ang winners.",
  ],
  partThree: [
    "And not everyone can afford that.",
    "That's the truth. Yun ang pinagdaanan namin dito.",
    "So nung lumaki na ang ad budget, yun pa rin ang ginawa namin. And it almost cost us the business dahil hindi na talaga ma-handle nang maayos.",
    "Mabuti na lang, I did something na binabalewala ng marami.",
  ],
  pivot: [
    "Instead of doing the same thing, I took every winning ad we ever made. All ₱100M+ in ad spend. And I fed it into my own AI ads agents.",
    "From then on, hindi na ako nagsisimula sa zero. Never na kami from scratch. Feed, generate, launch na lang.",
    "Mas naging consistent ang winning ads namin. This helped us scale fast without burning money on data — because we already have the data.",
    "That's when it hit me. Hindi mo kailangan maging magaling. Kailangan mo lang pala ng leverage.",
    "At posibleng hindi mo na kailangan mag-simula sa scratch kung may taong willing kang tulungan, wag mo lang mapagdaanan yung trial and error na madugo.",
    "And that's exactly what I want to hand you. Hindi mo na kailangang magsunog ng pera para matuto. We already did.",
  ],
} as const;

export const bigBrands = {
  eyebrow: "The real fight",
  title: "This is what we did to compete with big brands — then beat them",
  intro: [
    "Kahit local business ka lang, kalaban mo talaga jan ang malalaking brand. Malaki ang budget nila. They have bigger names.",
    "Pakiramdam mo, imposibleng manalo.",
    "Yung customer na malapit sa'yo? They see the big brand first. Not because it's better. Kundi dahil sila ang laging nakikita.",
  ],
  deadEnds: [
    {
      label: "Organic content",
      body: "Kailangan mo munang maging viral ng ilang beses bago ka magkaroon ng kita jan.",
    },
    {
      label: "Free advice on YouTube",
      body: "That's for brands with big budgets and known names.",
    },
    {
      label: '"Spend more to test"',
      body: "Madaling sabihin 'yan kung milyon ang budget. Ikaw, ₱300 kada araw ang laban mo.",
    },
    {
      label: "Agencies",
      body: "Di sila tumatanggap ng low-budget clients. And if they do, ₱30K to ₱50K a month — para may sure profit sila, hindi para mag-expand ka.",
    },
  ],
  close: [
    "So you're stuck. Masyadong maliit para sa agency. Masyadong busy para maging ads expert. And every day, palayo nang palayo ang malalaking brand.",
  ],
  verdictLead: "Hindi ikaw ang problema.",
  verdict: "The old strategies are broken.",
  verdictBody: [
    "Ginagamit mo ang strategy ng pang-malaking kumpanya, dala-dala ang budget ng maliit.",
    "You don't need a bigger budget. Kailangan mo lang ng tamang system sa pag-ads — one that already knows what works and gives repeated, expected results.",
  ],
} as const;

export const speed = {
  eyebrow: "Your unfair advantage",
  title: "You can build breakthrough campaigns in less than a day",
  body: [
    "No exaggeration.",
    "Yung dating inaabot ng isang linggo at buong team? You can do it in one afternoon. Mag-isa. Sa laptop mo lang.",
    "Picture it. Umaga, wala kang ad. Before dinner, live na ang buong campaign. Because the AI writes your script and image. Ikaw na lang ang mag-launch.",
  ],
  timeline: [
    { time: "9:00 AM", event: "Blank screen. Walang ad." },
    { time: "10:30 AM", event: "Offer locked in using the Offer Strategist." },
    { time: "12:00 PM", event: "5 scripts generated. Hooks and angles ready." },
    { time: "2:00 PM", event: "10 image ads out of the Image Strategist." },
    { time: "5:00 PM", event: "Campaign live. 1 campaign, 1 ad set, 5 creatives." },
  ],
  close: [
    "Ganito lumalaban ang maliit na negosyo sa malalaking brand. Hindi sa mas malaking budget — kundi sa mas mabilis na paggawa, testing, at paglabas ng ads.",
    "Habang pinag-uusapan pa ng big brands ang isang creative, ikaw nakapag-launch at nakapag-test na ng sampu.",
  ],
} as const;

export const forYou = {
  eyebrow: "Qualify yourself",
  title: "This is for you if…",
  items: [
    "May maliit na negosyo ka na kumikita, pero hirap mag-expand o kumuha ng repeat customers.",
    "Pagod ka nang manghula kung anong ad ang gagana — at wala kang budget na pang-sunog.",
    "Gusto mong talunin ang mas malalaking brand sa field mo, kahit maliit ang budget.",
    "Walang oras o team para maging ads expert. But you still need to sell.",
    "Gusto mo ng system. Not one-off wins na nauubos agad.",
    "Handa kang mag-test, mag-edit, at kumayod. Not just watch.",
  ],
  close: "If that's you, nasa tamang lugar ka.",
} as const;

export const system = {
  eyebrow: "What it is",
  title: "The ₱100M Ads2Sawa System",
  body: [
    "This is the full system na ginamit ko para gumawa ng winning ads on repeat.",
  ],
  usedFor: [
    "Ginawang top brand ang car dealership ng isang client — umabot ng ₱10M+ per month.",
    "Nag-launch ng bagong brand na nag-close ng 37 clients in two weeks, sa ₱500 a day.",
    "Applied sa sarili kong business na nagbebenta ng simple Excel templates — ₱300K gross sales in under a month, consistently.",
  ],
  notThis: [
    "Hindi 'to course na panonood mo lang tapos iiwan ka.",
    "Hindi 'to template pack na kokolektahin mo lang tapos hindi magamit.",
  ],
  isThis: [
    "It's a done-for-you ad system. Ang AI Custom GPTs na ang gagawa ng script at image mo.",
    "We give you the exact setup na gumagana kahit maliit ang budget, plus proven hooks and strategy mula sa ₱100M+ ad spend at years of testing.",
    "In short, tinanggal namin ang mahirap na parte. Ikaw na lang ang mag-launch.",
  ],
} as const;

/**
 * The seven deliverables. `asset` points at a real screenshot where one exists;
 * `slot` describes what the client still needs to drop in.
 */
export const modules = [
  {
    id: "offer-gpt",
    icon: "offer",
    name: "The Grandfather Offer Strategist GPT",
    value: 5000,
    summary:
      "An interview-style GPT na tumutulong bumuo ng malakas at mabentang offer.",
    benefits: [
      "Ayusin ang offer mo para bumenta. Kadalasan, hindi ang ad ang problema — it's the offer.",
      "Ilabas ang mga selling point na hindi mo alam na meron ka.",
      "Lower your ad cost. Mas madaling mag-convert ang mas malakas na offer.",
    ],
    shift: {
      from: "isa lang akong nagtitinda",
      to: "an offer they can't ignore",
    },
    asset: {
      src: "/proof/offer-listing.webp",
      width: 498,
      height: 631,
      alt: "Sell2Sawa AI Sales Agent product listing priced at ₱3,499, down from ₱15,000, rated 4.4 stars",
      caption: "An offer built with it",
    },
  },
  {
    id: "quick-start",
    icon: "rocket",
    name: "₱300 Winning Ad Launch System",
    value: 5000,
    summary:
      "A guided quick-start para makagawa ka ng buong ad set — 5 complete ads, copy and images, in under 2 hours.",
    benefits: [
      "Makagawa ng 5 launch-ready ads bago matapos ang hapon mo. Even if it's your first time.",
      'Kill the "saan ba ako magsisimula?" freeze. Kumikilos ka na agad.',
      "No agency, freelancer, or VA para makapag-launch ng ad today.",
    ],
    shift: { from: "hindi ako marunong mag-ads", to: "I run my own campaigns" },
    slot: {
      ratio: "4 / 3",
      label: "Quick-start walkthrough",
      spec: "Screen recording o screenshot ng quick-start dashboard — 1200×900",
    },
  },
  {
    id: "image-gpt",
    icon: "image",
    name: "Scroll-Stopping Image Ads Strategist GPT",
    value: 7000,
    summary:
      "A custom GPT na gumagawa ng 10 branded image ads in one hour. Naka-tune sa brand mo. No subscription needed.",
    benefits: [
      "Get a week's worth of scroll-stopping creatives in an hour. Mas mura pa sa isang kape.",
      "Magmukhang kasing-ganda ng malalaking brand ang ads mo. No designer needed.",
      "Hindi ka na maghihintay ng tatlong araw sa freelancer na nag-go-ghost.",
    ],
    shift: {
      from: "hindi ako marunong gumawa ng creative",
      to: "my ads look pro",
    },
    slot: {
      ratio: "4 / 3",
      label: "10 generated image ads",
      spec: "Grid ng 10 AI-generated image ads na ginawa ng GPT — 1200×900",
    },
  },
  {
    id: "script-gpt",
    icon: "script",
    name: "100M Script Strategist GPT",
    value: 7000,
    summary:
      "A done-for-you script generator. Hooks, angles, full scripts — built on the framework mula sa ₱100M+ ad spend.",
    benefits: [
      'Gumawa ng maraming ad scripts in minutes, same "ad DNA" from ₱100M+ in spend.',
      "Skip the burn. Hindi mo na susunugin ang budget para matuto. Alam na ng framework.",
      "Laging may fresh angle kapag namatay ang isang ad. Buhay ang campaign mo.",
    ],
    shift: { from: "hindi ako writer", to: "I write ads that sell" },
    slot: {
      ratio: "4 / 3",
      label: "Script generator output",
      spec: "Screenshot ng GPT na naglalabas ng hook + full script — 1200×900",
    },
  },
  {
    id: "campaign-setup",
    icon: "blueprint",
    name: "Campaign Structure & Setup Blueprint",
    value: 4000,
    summary:
      "The exact account, pixel, at geolocation setup. Plus the campaign structure. Built so you can start at ₱300 a day and scale to ₱100K a day.",
    benefits: [
      "The exact structure na nagpapalaban sa ₱300 a day against brands spending 100x more.",
      "Fully scalable. Gumagana from ₱300 up to ₱100K a day.",
      "Proven in the post-Andromeda era. Hindi 'yung lumang setup na patay na.",
    ],
    shift: {
      from: "sinusunog lang ng ads ang pera ko",
      to: "I run ads like a pro",
    },
    asset: {
      src: "/proof/campaign-1-1-5.webp",
      width: 1448,
      height: 106,
      alt: "Meta Ads Manager showing 1 campaign selected, 1 ad set, and 5 ads selected",
      caption: "1 : 1 : 5 in Ads Manager",
    },
  },
  {
    id: "hooks",
    icon: "hook",
    name: "100+ Proven Winning Ad Hooks",
    value: 3000,
    summary: "A library of 100+ hooks na proven sa totoong ads.",
    benefits: [
      "Kopyahin ang mga hook na humihinto ng scroll and drive sales.",
      "Panalo ka sa pinakamahirap na parte — ang first 3 seconds. No guessing.",
      "Start from proven, hindi from scratch.",
    ],
    shift: {
      from: "nanggagaya ako ng kakompetensya",
      to: "modeling what actually wins",
    },
    slot: {
      ratio: "4 / 3",
      label: "Hook library",
      spec: "Screenshot ng hook swipe file / Notion database — 1200×900",
    },
  },
  {
    id: "video-vault",
    icon: "video",
    name: "1,500+ Hook Video Vault",
    value: 4000,
    summary: "A vault of 1,500+ scroll-stopping hook videos na pwede mong modelohin.",
    benefits: [
      "Panoorin at gayahin ang libo-libong video hooks. No guessing what works.",
      "Gumawa ng sarili mong scroll-stopping video by modeling proven ones.",
      "Lower your cost per result gamit ang tamang hook.",
    ],
    shift: { from: "wala akong maisip", to: "I always have inspiration" },
    slot: {
      ratio: "4 / 3",
      label: "Video vault",
      spec: "Grid preview ng hook video vault — 1200×900",
    },
  },
] as const;

/**
 * The Ads Manager total behind every "₱100M+ in ad spend" line on this page.
 * Left uncropped on purpose: the surrounding Ads Manager chrome and the
 * campaign rows are what make the total checkable rather than assertable.
 */
export const adSpendDashboard = {
  src: "/proof/adspend-100m.webp",
  width: 996,
  height: 851,
  alt: "Meta Ads Manager campaign table showing results from 75 campaigns with a total spent of ₱112,275,977.11",
  caption: "₱112,275,977.11 spent · 75 campaigns",
  note: "Meta Ads Manager, all-time. This is the ₱100M+ the system was built on.",
} as const;

/** Live receipts from the two-week test. Every one is a real screenshot. */
export const receipts = [
  {
    src: "/proof/paid-3499.webp",
    width: 1016,
    height: 786,
    alt: "Messenger thread showing an order for ₱3,499 marked as paid, with a Maya payment confirmation",
    caption: "Paid · ₱3,499 · Maya",
    note: "Lead stage set to Converted",
  },
  {
    src: "/proof/maya-3918.webp",
    width: 675,
    height: 1090,
    alt: "Phone screen showing a successful Maya payment of ₱3,918 to merchant OrnnBusiness",
    caption: "Paid · ₱3,918 · 26 Dec",
    note: "Client's own payment confirmation",
  },
  {
    src: "/proof/converted-2500.webp",
    width: 1345,
    height: 479,
    alt: "Messenger thread showing a ₱2,500 order marked paid and a client asking about a follow-on website project",
    caption: "Converted · ₱2,500",
    note: 'Then asked for more work: "Magagawan mo ba kami ng website?"',
  },
  {
    src: "/proof/chat-inquiry.webp",
    width: 1022,
    height: 701,
    alt: "Messenger conversation where the AI sales agent answers a lead's questions and collects their contact number, which is blacked out",
    caption: "AI qualified the lead",
    note: "Number and call time collected, then handed to sales. Number hidden — it's a real customer's.",
  },
  {
    src: "/proof/chat-scaling.webp",
    width: 1014,
    height: 700,
    alt: "Messenger conversation where a lead asks about scaling ad budget and the AI agent answers instantly",
    caption: "Instant reply, 24/7",
    note: "Objection handled before a human stepped in.",
  },
  {
    src: "/proof/client-gift.webp",
    width: 900,
    height: 1200,
    alt: "Box of frozen meat sent as a gift by a client from their own store",
    caption: "Gift from a client",
    note: "Sent from their own store. First wave, week one.",
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  /** Business and location, e.g. "Auto parts, Pampanga". */
  business: string;
  /** Optional headshot in /public. */
  avatar?: { src: string; width: number; height: number };
  /** Optional screenshot of the original message, mounted as an exhibit. */
  screenshot?: { src: string; width: number; height: number; alt: string };
};

/**
 * Add real client testimonials here and the section fills itself in.
 * Until then it renders three labelled slots — no invented quotes.
 */
export const testimonials: readonly Testimonial[] = [];

export const caseStudy = {
  eyebrow: "Your bonus if you get access today",
  title: "How we closed 37 clients in two weeks on ₱500/day",
  intro: [
    "Ang bilis, and nabigla kami. Hindi na nga namin makayanan i-handle yung dami ng clients, kaya napilitan kaming i-turn off ang ads.",
    "And the best part? It's been six months. Pero 34 sa 37 na 'yun ay kasama pa rin namin hanggang ngayon. And they pay us monthly. Not one-time. Paulit-ulit.",
  ],
  math: [
    {
      question: "Nagbebenta ka ng ₱1,000 product?",
      answer: "37 new customers is ₱37,000. In two weeks.",
    },
    {
      question: "May serbisyo ka sa ₱5,000 a client?",
      answer: "A ₱500-a-day bet, umuwi kang may ₱185,000.",
    },
  ],
  close: [
    "Then add the 34 na bumabalik. Hindi mo na sila hahabulin ulit. Kusa silang bumabalik.",
    "That's the difference between one sale and a system.",
    "The exact ads. The exact hooks. The exact strategy. Ibibigay ko lahat sa'yo, documented. All you have to do is copy, adapt, and launch.",
  ],
  steps: [
    { label: "Choose the product", detail: "Sell2Sawa AI Sales Agent." },
    { label: "Build the offer", detail: "Using the Offer Builder Custom GPT." },
    { label: "Generate ad ideas and scripts", detail: "Around 95% AI-generated." },
    { label: "Make ~5% revisions", detail: "Minor human polishing." },
    {
      label: "Create the creatives",
      detail: "Mostly AI. No faces, no influencers.",
    },
    { label: "Launch", detail: "1 campaign. 1 broad ad set. 5 creatives." },
    {
      label: "AI replies almost instantly",
      detail: "Prospects experience the product while asking about it.",
    },
    {
      label: "Sales team closes the hot leads",
      detail: "By this point, marami nang convinced.",
    },
    { label: "Start at ₱500/day", detail: "Then increase to ₱1,000/day." },
  ],
} as const;

export const pricing = {
  eyebrow: "The price",
  title: "Sa'yo na ang buong Ads2Sawa System",
  subtitle: "For less than the price of one family meal out",
  lead: [
    "Before the price, isipin mo kung magkano ang halaga nito sa'yo.",
    "One winning ad. Isa lang. Kaya nun baguhin ang buong buwan mo. A new customer every day, habang tulog ka.",
  ],
  afterStack: [
    "And that's before the “How We Closed 37 Clients” bonus. Hindi mo mabibili 'yan kahit saan.",
    "But the real value isn't the ₱35,000. What it took to build this? Over ₱100M in ad spend. 11 months of testing. Five years of experience.",
    "You skip all of that. Binili na namin ang mga aral. We just hand you the answers.",
  ],
  ladder: ["Not ₱17,000.", "Not ₱8,000.", "Not even ₱4,000."],
  reveal: [
    "Mas mura pa 'yan sa isang dinner out ng pamilyang apat. One meal na tapos in an hour — versus a system habambuhay mong magagamit.",
  ],
  catch: [
    "But there's a catch. Hindi 'to mananatili sa ₱997.",
    "Kung isa ka sa mga unang kukuha, before September, makukuha mo 'to for only ₱397.",
    "Why so low? Kasi gusto namin ang mga kumikilos agad. The underdogs ready to fight today. Not “next month.” Hindi 'yung “pag may budget na.”",
    "This is our founding price, para sa mga unang naniwala. After September, babalik sa ₱997.",
  ],
} as const;

export const guarantee = {
  eyebrow: "Your protection",
  title: "You are protected by our 5-use money-back guarantee",
  body: [
    "Here's how sure I am na gumagana 'to.",
    "Grab the system. Gamitin mo para gumawa ng 5 ads. Actually use it, hindi lang basahin.",
    "Run the Script Strategist. Generate your images. Mag-launch ng campaign sa area mo. Give it a real shot.",
    "If after those 5 uses wala kang makuhang useful, email us. We refund you. No questions. Walang papipirmahan.",
  ],
  kicker: "The risk isn't on you. Nasa akin 'yun.",
  closing: [
    "At ₱397, protektado ng guarantee, hindi na “paano kung hindi gumana” ang tanong.",
  ],
  question: "It's “paano kung gumana, at hindi ko sinubukan?”",
} as const;

export const fork = {
  eyebrow: "30 days from now",
  title: "Only two things can happen to your business",
  options: [
    {
      kind: "stay" as const,
      label: "Option one",
      heading: "Nasa parehong spot ka pa rin",
      items: [
        "Nilalangaw pa rin ang mga post mo, umaasa.",
        "Still burning budget — ₱500 dito, ₱500 doon, walang kasiguraduhan.",
        "Nanonood pa rin sa malalaking brand sa area mo, iniisip kung paano nila nagagawa.",
        "And your business? Nasa kung saan mo iniwan. Hindi umusad.",
      ],
    },
    {
      kind: "move" as const,
      label: "Option two",
      heading: "May ad system ka na",
      items: [
        "Kaya mong gumawa ng winning ads mag-isa. No freelancer to wait on.",
        "Kaya mong maglabas ng bagong creatives anytime. Kahit alas-dose ng gabi.",
        "Alam mo na kung paano mag-optimize para lumaki ang resulta. No more guessing.",
        "And for the first time, hindi ka na natatakot sa malalaking brand.",
      ],
    },
  ],
  close: [
    "Only one of the two will happen. And one of them happens no matter what you choose — kasi ang pagpapaliban, isa ring desisyon.",
    "“Next month” is a decision to stay exactly where you are.",
  ],
  kicker: "Isang click lang ang pagitan ng dalawang buhay na 'yun.",
  signature: { name: "June", role: "Founder, ORNN" },
} as const;

export const faqs = [
  {
    q: "Do I need to be techy for this?",
    a: [
      "No. If you can use Messenger and post on Facebook, kaya mo 'to.",
      "The AI handles the hard part — the script, the image. You just copy, paste, and launch. Everything is documented, step by step.",
    ],
  },
  {
    q: "I don't know anything about Meta ads yet. Is this still for me?",
    a: [
      "Yes. You're exactly who this is built for.",
      "You won't start from zero. You start with a proven setup, proven hooks, and AI that writes your ads.",
      "The truth? Beginners benefit most, because you skip the long, expensive, madugong trial-and-error. We already did that.",
    ],
  },
  {
    q: "How much ad budget do I actually need?",
    a: [
      "You can start on ₱300 a day. That's it. The whole system is built for small budgets.",
      "And it's scalable — it works from ₱300 up to ₱100K a day.",
    ],
  },
  {
    q: "Is there a monthly subscription?",
    a: [
      "None. One-time only. No monthly fees to use the GPTs and guides. Pay once, it's yours for life.",
    ],
  },
  {
    q: "How long before I can make my first ad?",
    a: [
      "You can do it in one afternoon.",
      "Morning, you have no ad. Before dinner, you have a full ad set — 5 ads with copy and images, in under 2 hours using the Quick Start.",
    ],
  },
  {
    q: "What kind of business is this for?",
    a: [
      "Local and online. Brick-and-mortar, food, services, e-commerce, even personal brands.",
      "If you sell something and you need customers, para sa'yo 'to. (Results depend on your offer, budget, and market.)",
    ],
  },
  {
    q: "What if it doesn't work for me?",
    a: [
      "You're protected. Use the system to create 5 ads — actually use it, hindi lang basahin.",
      "If you get nothing useful out of those 5 uses, email us. We refund you. No questions.",
    ],
  },
  {
    q: "When do I get access?",
    a: [
      "Right away. After checkout, the dashboard, the GPTs, the guides, and all the bonuses open immediately. You can start tonight.",
    ],
  },
  {
    q: "How is this different from boosting a post?",
    a: [
      "Big difference. Boosting is built to spend your money, not to sell. Pindot, ₱500, a few likes, then nothing.",
      "This gives you a real campaign structure, proven hooks, and AI-generated creatives — the exact way a small business competes with big brands.",
    ],
  },
  {
    q: "Is it really just ₱397? What's the catch?",
    a: [
      "No catch. ₱397 is the founding price, for the first ones to grab it before September.",
      "After September it goes back to ₱997. A lower price for those who move now. Simple lang.",
    ],
  },
] as const;

export const finalCta = {
  eyebrow: "Last call",
  title: "Ito ang system na makakatalo sa mga big brands, kahit limitado ang budget mo",
  body: [
    "And this isn't just talk. Na-prove ko na. Not once. Paulit-ulit.",
    "A car dealership na nagsimulang walang kilala — ginawa naming number one sa bansa.",
    "A brand new business na umabot ng 10x to 20x ROAS sa ₱1K to ₱2K a day. Not ₱100K. Libo lang.",
    "37 clients closed in two weeks, sa ₱500 a day.",
    "Different products. Different niches. Pawang walang kilala noong simula. All won with the same system.",
  ],
  challenge:
    "So kung may boses na nagsasabing “baka sa akin hindi gumana,” itanong mo 'to: what did those brands have na wala ka?",
  answer: "Wala. Kundi ang system. And it's in your hands now.",
} as const;

export const legal = {
  disclaimer:
    "Results shown are from our own campaigns and those of specific clients. They are not typical or guaranteed. Your results depend on your offer, budget, market, and execution. Ads2Sawa is not endorsed by or affiliated with Meta Platforms, Inc.",
} as const;
