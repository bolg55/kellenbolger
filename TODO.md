# Outstanding TODOs

Things left after the "Show me once" redesign. Search the code for `TODO(kellen)` to find each spot.

## Needs a decision or info from Kellen

- [ ] **Booking link.** Set up Cal.com: one event, "Walkthrough (1 hour)", with Google Calendar, an auto video link, a "What's the task that eats your week?" question, and Stripe connected to take the $300 at booking. Paste the URL into `bookingUrl` in `src/data/site.ts`. A "Pick a time" link then appears next to the contact form.
- [ ] **HST.** Once registered, add "plus HST" to the prices in `src/data/site.ts`.
- [ ] **Data claim.** The trust section says you use paid, business-grade AI that doesn't train on client data. Keep that true: move anything on Gemini's free tier (including tidyAR) to the paid tier. Wording is in `src/components/sections/Trust.tsx`.
- [ ] **Confirm Fastify** in the Action Backers "How it's built" note (`src/data/caseStudies.ts`).
- [ ] **Pioneer Log Homes.** Once it's launched and the client has approved it, add it to `src/data/caseStudies.ts` with `category: "website"`.
- [ ] **RPM Construction.** If you haven't already, let them know they're featured on the site.

## Worth doing soon

- [ ] **Ask for testimonials.** Ask RPM (and every future client) for a sentence or two. Add them to `src/data/testimonials.ts` with `visible: true`. The section stays hidden until there's at least one. Real quotes only.
- [ ] **Refresh link previews.** The social preview image changed. Run the homepage through LinkedIn's Post Inspector so old shares pick up the new image.
- [ ] **Analytics.** Turn on Cloudflare Web Analytics (free, no cookie banner needed) to see whether referral visits turn into bookings.

## Housekeeping

- `docs/site-redesign-brief-v2.1.md` is the brief this redesign was built from. The code has since moved past it: the Work section is now grouped by offer, with a featured project per category. Treat the code as the source of truth.
