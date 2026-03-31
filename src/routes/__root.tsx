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
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        children: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")return;document.documentElement.classList.add("dark")}catch(e){}})()`,
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
