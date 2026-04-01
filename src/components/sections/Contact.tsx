import { type FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollReveal } from "@/components/ScrollReveal"
import { sendContactEmail } from "@/server/contact"

const TURNSTILE_SITE_KEY =
  import.meta.env.DEV
    ? "1x00000000000000000000AA"
    : "0x4AAAAAACyu9zZaWQqHaW_M"

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; theme: string }
      ) => string
      reset: (widgetId: string) => void
    }
  }
}

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>(null)

  useEffect(() => {
    const el = turnstileRef.current
    if (!el) return

    function renderWidget() {
      if (window.turnstile && el && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(el, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "auto",
        })
      }
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      // Script may still be loading — poll briefly
      const interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget()
          clearInterval(interval)
        }
      }, 200)
      return () => clearInterval(interval)
    }
  }, [])

  const resetTurnstile = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)

    const turnstileToken = formData.get("cf-turnstile-response") as string
    if (!turnstileToken) {
      setStatus("error")
      setErrorMessage("Please complete the verification challenge.")
      return
    }

    try {
      await sendContactEmail({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          message: formData.get("message") as string,
          honeypot: formData.get("company_url") as string,
          turnstileToken,
        },
      })
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
      setErrorMessage(
        "Something went wrong. Please try again or email me directly."
      )
      resetTurnstile()
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      {/* Subtle gradient background to visually separate */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(234,88,12,0.06),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(234,88,12,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-xl px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell me what you&apos;re working on and I&apos;ll get back to you
            within a day or two.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {status === "success" ? (
            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="font-medium text-foreground">
                Thanks! I&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Honeypot — hidden from real users, bots will fill it */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="company_url">Company URL</label>
                <input
                  type="text"
                  id="company_url"
                  name="company_url"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                />
              </div>

              <div ref={turnstileRef} />

              {status === "error" && (
                <p className="text-sm text-destructive">{errorMessage}</p>
              )}

              <Button type="submit" disabled={status === "sending"} size="lg">
                {status === "sending" ? "Sending..." : "Send message"}
              </Button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
