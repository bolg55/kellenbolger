# kellenbolger.ca

Personal services site built with TanStack Start, Tailwind v4, and Framer Motion. Deployed on Cloudflare Workers.

## Development

```bash
bun install
bun run dev
```

Site runs at `http://localhost:3000`.

## Deployment

### Prerequisites

- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) authenticated (`wrangler login`)
- Resend API key for the contact form

### Environment Variables

Set the Resend API key as a Cloudflare Workers secret:

```bash
wrangler secret put RESEND_API_KEY
```

### Deploy

```bash
bun run deploy
```

This runs `bun run build && wrangler deploy`. The worker config is in `wrangler.jsonc`.

### Preview (local Cloudflare environment)

```bash
bun run preview
```

### Custom Domain

Configure your domain in the Cloudflare dashboard under Workers & Pages > your worker > Settings > Domains & Routes.

## Images

Case study screenshots, the about photo and the social preview image (`og.png`) live in `public/images/`. Project data, including which projects appear on the homepage, is in `src/data/caseStudies.ts`. Prices, the booking link and footer links are in `src/data/site.ts`.

## Contact Form

The contact form uses [Resend](https://resend.com) via a TanStack Start server function (`src/server/contact.ts`). Emails are sent from `contact@mail.kellenbolger.ca`.
