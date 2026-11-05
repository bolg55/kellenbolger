# kellenbolger.ca — Site Redesign Brief (v2.1)

> **For the agent:** This brief changes the *positioning* of kellenbolger.ca. Update the site's structure and copy to match it, and **keep the existing visual system**: colours, type, spacing, card style and the `<kb>` mark. Read the codebase first. Reuse the existing section components in `src/components/sections/` and the data files in `src/data/`, and don't add dependencies unless you need them. Items marked `TODO(kellen)` are decisions Kellen hasn't made yet. Leave each one as a visible placeholder (or as a code comment where noted), and don't invent values.
>
> v2.1 replaces all earlier versions of this brief. The main changes from v1: the site leads with "Show me once" instead of "AI for small business", AI becomes one tool among several, the offer and the steps are merged into one section, and the Work section is updated.

---

## 1. Positioning

**The idea:** Someone shows Kellen a tedious, repetitive task once, and he makes sure they never do it by hand again.

The fix is whatever fits the task:
- a simple tool, like a parser, a formatter or a small web app;
- an AI assistant that knows the business's procedures and works across its tools;
- or both together.

Kellen keeps it running every month after.

**Why this and not "AI for small business":** that phrase is a crowded category, and every AI agency uses it. Kellen's real track record is turning manual processes into tools, sometimes with AI and sometimes without. "AI where it helps, plain code where it doesn't" sets him apart and earns trust with buyers who are skeptical of AI. Category words (AI, automation) belong in the SEO metadata only, not in the headline.

**Supporting offers:** custom tools and apps, and websites the owner can update themselves. Both sit below the core offer and are not equal headliners.

## 2. Who it's for

**Primary:** owners and managers of small businesses and teams (roughly 2–20 people), especially office-based professional services such as insurance brokers, financial advisors, bookkeepers and property managers. They lose hours to repetitive work: reformatting spreadsheets, re-keying data between systems, building the same report every week, chasing follow-ups.

**Do not** name an industry in the hero, the headings or the SEO metadata. The site stays industry-neutral. Industry flavour comes only from the swappable example cards (§4.3) and the Work write-ups.

What they're like:
- Not technical. They don't know what an API, a parser or "skills" are, and shouldn't need to.
- Busy and skeptical of tech sales pitches.
- They usually arrive by referral. **The site's main job** is to make a referred visitor confident enough to book. SEO is secondary.
- Their biggest worry about AI: "Will it do something stupid with my clients or my money?"

**Proof points.** Use these as facts, not boasts:
- Senior solutions engineer by day. He builds real integrations instead of chaining no-code tools together.
- Built and ran his own software business to $100K in annual revenue, so he understands the business side as well as the code.
- Based in Kitchener-Waterloo. Works with businesses across Canada: in person locally, remotely anywhere.
- He sticks around. On the monthly plan, he's the person you text when something breaks.
- Anything AI-driven is set up so the AI drafts and the owner approves. Nothing goes out or touches money without a human OK.

**Do not** name Kellen's employer anywhere on the site. Naming tools that were used (including Strapi) in the `/work` build notes is fine.

## 3. Voice and copy rules

- Plain language. Write for a busy owner reading on their phone.
- Lead with concrete tasks and outcomes, not capabilities. Write the problem lines in the owner's own words ("Every Friday I copy the same numbers into the same spreadsheet."), not category phrases ("manual admin").
- Name each deliverable by what it does: "a tool that does it in a second", "an assistant that follows your playbook". Never "automation solutions".
- **Banned words and phrases:** *leverage, streamline, synergy, cutting-edge, revolutionize, seamless, unlock, empower, solutions, AI-powered, "it just happens", headless, content architecture, LLM, MCP, agentic, skills* (as a technical term), *workflow automation*.
  - **One exception:** "solutions" is allowed only in Kellen's job title, "senior solutions engineer". Don't change the title.
- Short sentences. Confident, friendly, a little dry. No exclamation marks.
- Canadian spelling (colour, etc.).
- **No fabricated testimonials, client logos, stats or case studies.** Use only the real projects and numbers listed in this brief.

## 4. Homepage structure

Top to bottom. The current order in `src/routes/index.tsx` is Hero, WhatIDo, Work, HowItWorks, Testimonials, About, Contact. Rework and reorder those sections, and add new ones only where noted.

### 4.1 Hero (`Hero.tsx`)
- **Eyebrow:** `KELLEN BOLGER · KITCHENER-WATERLOO`
- **Headline (the page's only `h1`):** "Show me once. Never do it by hand again."
  - Keep these alternates in a code comment: "If you do it every week, I can probably make it go away." / "The task that eats your week, turned into a button."
- **Subhead:** "Walk me through the task that eats your week. I'll turn it into a tool, or an AI assistant that knows how you do it, and keep it running."
- **Small line under the CTAs:** "Working with businesses across Canada · In person or remote"
- **Primary CTA:** "Book a walkthrough", linking to the contact section (§5)
- **Secondary CTA:** "See examples", scrolling to §4.3

### 4.2 The problem (new, short)
Three short lines or small cards, in the owner's own words and industry-neutral:
- "Every week I copy the same numbers into the same spreadsheet."
- "We pay for AI and nobody really uses it."
- "Half my day is re-typing things from one system into another."

### 4.3 Examples (replaces `WhatIDo.tsx` content)
**Heading:** "The kind of thing people show me."
**Intro line:** "Some of these need AI. Some just need a bit of code. You don't have to know which."

A grid of 6 cards. Each card has a short "ask" in quotes and one line on what happens. These are illustrative examples, not claims about past clients. Present them as examples, not promises.

**Implementation requirement:** drive the grid from one typed array in `src/data/examples.ts`. Export `Example[]`, where each item has `ask: string`, `result: string` and an optional `kind?: "tool" | "assistant"`. Kellen will swap and reorder these later without touching the layout. Don't render `kind` as a visible label. It's for Kellen's reference only.

| Ask | What happens | kind |
| --- | --- | --- |
| "Turn this messy export into our client template." | One click, and it's formatted the way you always do it. | tool |
| "Run the month-end checklist." | Works through your steps across your tools and flags anything that needs you. | assistant |
| "Who still owes us money?" | Pulls overdue invoices and drafts polite reminders for you to send. | assistant |
| "Prep me for my 2pm with the Campbells." | Pulls recent emails, notes and files into a one-page brief. | assistant |
| "Get these 40 PDFs into the spreadsheet." | Reads them and fills in the rows. You check and save. | tool |
| "Follow up with everyone who got a quote last week." | Drafts each follow-up in your wording. You approve and send. | assistant |

### 4.4 How it works: the core offer (replaces `HowItWorks.tsx`, merged with the old offers section)
This is the most visually prominent section after the hero. It's one section, not a separate offers card plus a steps list.

**Heading:** "How it works"

Three steps:

1. **Show me.** "We sit down for an hour, in person or on a call. You walk me through where your time goes, and I come back with the three tasks most worth handing off. Fixed price, and it's credited toward the build if you go ahead."
   - Price: `TODO(kellen)`. Recommended: show this price publicly as "From $X" once it's set.
2. **I build it.** "A tool, an AI assistant, or both, whichever does the job best. Built around how you already work, using the software you already have. Timeline agreed up front, usually a few weeks."
   - Price: `TODO(kellen)`
3. **I keep it running.** "Fixes when your tools change, new tasks as you think of them, a short monthly note on what it did, and a direct line to me."
   - Price: `TODO(kellen)`

Show "Pricing on the call" for any step without a price. **Do not invent numbers.**

**"Also" row (small, below the steps):** two compact cards, clearly smaller than the steps.
- **Custom tools and apps.** "When off-the-shelf software doesn't fit how you work, I build the one that does."
- **A website you can update yourself.** "A fast, modern site you can edit without calling anyone."

Remove the old "Product Strategy & Scoping" and "Headless CMS & Content Architecture" cards. Scoping now happens in "Show me", and the CMS card becomes the website card above.

### 4.5 Trust (new)
**Heading:** "Built so it can't go rogue."
- **It drafts. You send.** Anything that leaves your business or touches money needs your OK.
- **Only the access it needs.** Read-only wherever possible.
- **Sometimes there's no AI at all.** If plain code does the job, that's what you get: predictable, every time.
- **Your data stays yours.** `TODO(kellen)`: confirm the exact claim (which AI provider, what's stored where). Leave this bullet as a code comment until it's confirmed.
- **A real person.** "You're dealing with me, not a call centre."

### 4.6 Work (`Work.tsx`, data in `src/data/caseStudies.ts`)
**Section heading:** "Things I've built". This is honest framing: it's a mix of Kellen's own products and prototypes, not a list of client results.

The homepage shows the **first 3 entries with `visible: true`**, in the order of the `caseStudies` array, and links to a new `/work` page that lists every visible entry with slightly longer write-ups. Keep the existing card style and the `visible` flag. Add any fields you need, e.g. `howItsBuilt?: string` and a required `status: "client" | "own-product" | "prototype"`. Show `status` on each card as a small tag: "Client work", "My product" or "Prototype". Every card must render cleanly without an image.

**Array order (this sets what the homepage shows):**

1. **Website rebuild** (new entry, `status: "client"`, `visible: false`). `TODO(kellen)`: pick one or two rebuilds done for friends: an old site turned into a fast, modern one the owner can edit. Add the name (with the owner's OK), a short before/after description, and a URL if it's live. Its "How it's built" note may mention Strapi. Until it's filled in, it stays hidden.
2. **Action Backers** (existing entry, `status: "own-product"`). "Built and ran my own SaaS business to $100K in annual revenue." Keep the name. Keep the existing description of what it did (bet tracking and analytics, automated grading via live score APIs).
3. **Fee-change formatting prototype** (new entry, `status: "prototype"`, `visible: true`). This is one project. Don't split it into separate entries. Do **not** name the person, the insurance company or any financial institution.
   - Title: "A 20–60 minute task, down to about a second"
   - Description: "A prototype for a repetitive process an insurance team did by hand: turning messy fee-change spreadsheets into clean, formatted output. A simple interface plus a parser. No AI needed."
   - Outcome: "Prototype handled a 20–60 minute task in about a second."
   - **Do not claim it was adopted, deployed, or saved anyone time.** Don't mention the 600-a-year figure or any hours saved.
   - `TODO(kellen)`: if it's confirmed as delivered and in use, change `status` to `"client"` and update the outcome line.
4. **tidyAR** (existing entry, `status: "own-product"`). Reframe it as a working product, with no traction claims.
   - Description: "A working tool that reads messy job data, drafts invoices with AI, and syncs them to QuickBooks and Xero."
   - Outcome: replace "Live product serving real customers" with "Built and running end-to-end". **Do not claim customers or revenue.**
5. **Camp Yoga Scheduler** (existing entry, `status: "prototype"`). Rewrite the copy as a prototype.
   - Description: "A scheduling and client management prototype for a boutique yoga retreat, built as a custom replacement for a $400/month subscription."
   - Outcome: "Working prototype, built end-to-end."
   - **Do not claim it's live or in use, that it replaced anything, or that it was paid for.** Remove any "flat fee" or "monthly hosting" wording.

Result: until a website rebuild is added, the homepage shows Action Backers, the fee-change prototype and tidyAR. That covers a real business, a no-AI tool and an AI-plus-integrations tool. Once a rebuild is added, it leads the list and tidyAR moves to `/work`. Camp Yoga appears on `/work` only.

Also on `/work`:
- Leave a commented-out slot: `// TODO(kellen): add Pioneer Log Homes once launched and approved by client`

**`/work` "How it's built" notes:** under each write-up, add one or two lines in a smaller, muted style for technical readers, such as a referring friend. These may name real tools (e.g. Claude, Strapi, QuickBooks API, React). This is the only place on the site where technical terms are allowed. Fill it in for tidyAR, Camp Yoga and Action Backers from what's in the repo, and leave `TODO(kellen)` for the rest or wherever you're unsure.

### 4.7 About (`About.tsx`)
Two or three sentences, first person: self-taught developer, senior solutions engineer by day, built and ran his own software business to $100K a year, based in Kitchener-Waterloo. Keep it human. A line about music is fine if it's already on the site. No employer name.

Include this line, or something close to it: "By day, I build AI assistants that a whole team uses every day. They connect to the team's tools and follow its procedures. I set up the same kind of thing for small businesses." `TODO(kellen)`: confirm your employer is OK with this description. Until confirmed, leave the line as a code comment.

**Do not** describe the internal tool in more detail anywhere on the site. Don't give it a Work card, and don't name the tools, systems or employer behind it.

### 4.7a Footer (`Footer.tsx`)
Add small text links to GitHub and LinkedIn for technical visitors: `TODO(kellen)`: GitHub URL, LinkedIn URL. Render each link only once its URL is set. Personal and side projects (APIs, MCP wrappers and so on) live on GitHub only. Don't add them to the homepage or `/work`.

### 4.8 Testimonials (`Testimonials.tsx`, `src/data/testimonials.ts`)
Keep the component, but it must **render nothing** when no testimonials are `visible`. Remove the placeholder entry, so the array is empty, and add the comment `// Add real client quotes only. Do not fabricate.`

### 4.9 Final CTA and contact (`Contact.tsx`)
- **Heading:** "What would you never want to do by hand again?"
- **Sub-line:** "Book a one-hour walkthrough. Fixed price, no obligation."
- Button text: "Book a walkthrough"

## 5. Contact / booking
- Reuse the existing contact form in `Contact.tsx`, and keep the Cloudflare Turnstile and honeypot exactly as they are.
- If they aren't already there, add the fields "Business name" and "What's the task that eats your week?" (textarea). Keep name and email.
- `TODO(kellen)`: an optional booking URL (Cal.com or Calendly). If one is set, show a "Pick a time" link next to the form. If not, show nothing.
- "Book a walkthrough" appears in the hero, in the nav (desktop and mobile sheet) and in this section. Make it easy to tap on mobile.

## 6. Design constraints
- **Keep the current look:** existing theme tokens (including the light/dark toggle), accent colour, display and body fonts, rounded bordered cards, icon tiles, uppercase accent eyebrow labels (`SectionLabel`). Restructure, don't restyle.
- Tailwind and the existing shadcn/ui components. TypeScript throughout.
- Mobile first. Check every section at ~375px.
- The "How it works" steps must be visually dominant over the "Also" cards.
- Accessibility: one `h1`, logical heading order, sufficient contrast in both themes, visible focus states, meaningful link and button text.
- Keep it fast: no new animation libraries and no new large images. The existing `ScrollReveal`, `TiltCard` and `DotConstellation` can stay where they're already used.

## 7. SEO / metadata
- `<title>`: "Kellen Bolger | AI & Automation, Kitchener-Waterloo" (under ~60 chars)
- Meta description (~150 chars): "Show me the task that eats your week and I'll turn it into a tool or AI assistant that does it for you. Kitchener-Waterloo, working across Canada."
- Update the Open Graph title and description to match.
- `/work` gets its own title ("Work | Kellen Bolger") and description.

## 8. Out of scope
- No pricing page and no invented numbers.
- No blog or long case studies yet.
- No chatbot widget.
- No changes to hosting, deployment or framework.
- Don't delete any page other than reworking the homepage sections without flagging it first.

## 9. Acceptance checklist
- [ ] Homepage sections match §4 in order and intent, and `/work` exists.
- [ ] No industry named in the hero, the headings or the metadata. Examples come from `src/data/examples.ts`.
- [ ] No banned words from §3 in site copy, except the `/work` "How it's built" notes and the job title "senior solutions engineer" (grep for them).
- [ ] No fabricated testimonials, stats, logos or prices. Every `TODO(kellen)` is a visible placeholder or a comment.
- [ ] Employer not named anywhere. No insurance company or financial institution named.
- [ ] Every Work card shows its status tag. tidyAR makes no customer or revenue claims. The fee-change entry appears once. Fee-change and Camp Yoga are tagged "Prototype" and claim no adoption, payment or time saved.
- [ ] "Book a walkthrough" appears in the hero, the nav and the contact section.
- [ ] Testimonials section renders nothing when empty.
- [ ] Looks right at 375px, 768px and desktop, in light and dark themes.
- [ ] Typecheck, lint and build pass.
- [ ] Summarise the changes and list every remaining `TODO(kellen)` at the end.

## 10. Open decisions for Kellen
1. Walkthrough, build and monthly prices (recommended: publish the walkthrough price).
2. Booking link, or the form only.
3. The exact data and privacy claim for the trust section.
4. The fee-change prototype: tell your friend you're describing it, unnamed, on the site. If it's in use, switch it from "Prototype" to a client project.
5. Which friend website rebuild(s) to show, with each owner's OK. This is the main gap: right now there is no live client project on the site.
6. Pioneer Log Homes, once it's launched and approved.
7. Your employer's OK for the one-line description of the internal AI assistant in About.
8. GitHub and LinkedIn URLs for the footer.
