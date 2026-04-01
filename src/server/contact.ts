import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"

interface ContactInput {
  name: string
  email: string
  message: string
  honeypot: string
  turnstileToken: string
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: ContactInput) => {
    if (!data.name || !data.email || !data.message) {
      throw new Error("All fields are required")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Invalid email address")
    }
    return data
  })
  .handler(async ({ data }: { data: ContactInput }) => {
    // Honeypot check — silently reject if filled
    if (data.honeypot) {
      return { success: true }
    }

    // Verify Turnstile token with Cloudflare
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: data.turnstileToken,
        }),
      }
    )
    const turnstileResult = (await turnstileResponse.json()) as {
      success: boolean
      "error-codes"?: string[]
    }
    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult)
      throw new Error("Verification failed. Please try again.")
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: "Kellen Bolger <contact@mail.kellenbolger.ca>",
      to: "kellen@kellenbolger.ca",
      subject: `New contact from ${data.name}`,
      replyTo: data.email,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    })

    return { success: true }
  })
