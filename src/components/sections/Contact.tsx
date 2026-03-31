import { type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollReveal } from "@/components/ScrollReveal"
import { sendContactEmail } from "@/server/contact"

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await sendContactEmail({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          message: formData.get("message") as string,
        },
      })
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again or email me directly.")
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-xl px-6">
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
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                />
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
