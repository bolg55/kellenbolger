import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"

import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kellen Bolger — Software That Solves Real Problems" },
      {
        name: "description",
        content:
          "Custom web apps, AI-powered tools, and accounting integrations — built fast, built to last.",
      },
      {
        property: "og:title",
        content: "Kellen Bolger — Software That Solves Real Problems",
      },
      {
        property: "og:description",
        content:
          "Custom web apps, AI-powered tools, and accounting integrations — built fast, built to last.",
      },
      {
        property: "og:image",
        content: "https://kellenbolger.ca/images/og.png",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kellenbolger.ca" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Kellen Bolger — Software That Solves Real Problems",
      },
      {
        name: "twitter:description",
        content:
          "Custom web apps, AI-powered tools, and accounting integrations — built fast, built to last.",
      },
      {
        name: "twitter:image",
        content: "https://kellenbolger.ca/images/og.png",
      },
      {
        name: "apple-mobile-web-app-title",
        content: "Kellen",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-96x96.png",
        sizes: "96x96",
      },
      { rel: "shortcut icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        children: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")return;document.documentElement.classList.add("dark")}catch(e){}})()`,
      },
      {
        src: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",
        async: true,
        defer: true,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
