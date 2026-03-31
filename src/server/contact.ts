import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { name: string; email: string; message: string }) => {
      if (!data.name || !data.email || !data.message) {
        throw new Error("All fields are required")
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        throw new Error("Invalid email address")
      }
      return data
    },
  )
  .handler(async ({ data }: { data: { name: string; email: string; message: string } }) => {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: "kellenbolger.ca <contact@kellenbolger.ca>",
      to: "kellen@kellenbolger.ca",
      subject: `New contact from ${data.name}`,
      replyTo: data.email,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    })

    return { success: true }
  })
