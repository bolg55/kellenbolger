// Illustrative examples, not claims about past clients.
// Swap or reorder freely; the grid renders whatever is here.

export type Example = {
  ask: string
  result: string
  // For Kellen's reference only. Not shown on the site.
  kind?: "tool" | "assistant"
}

export const examples: Array<Example> = [
  {
    ask: "Turn this messy export into our client template.",
    result: "One click, and it's formatted the way you always do it.",
    kind: "tool",
  },
  {
    ask: "Run the month-end checklist.",
    result:
      "Works through your steps across your tools and flags anything that needs you.",
    kind: "assistant",
  },
  {
    ask: "Who still owes us money?",
    result:
      "Pulls overdue invoices and drafts polite reminders for you to send.",
    kind: "assistant",
  },
  {
    ask: "Prep me for my 2pm with the Campbells.",
    result: "Pulls recent emails, notes and files into a one-page brief.",
    kind: "assistant",
  },
  {
    ask: "Get these 40 PDFs into the spreadsheet.",
    result: "Reads them and fills in the rows. You check and save.",
    kind: "tool",
  },
  {
    ask: "Follow up with everyone who got a quote last week.",
    result: "Drafts each follow-up in your wording. You approve and send.",
    kind: "assistant",
  },
]
