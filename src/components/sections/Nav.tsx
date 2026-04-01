import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "What I Do", hash: "what-i-do" },
  { label: "Work", hash: "work" },
  { label: "Contact", hash: "contact" },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-colors duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-heading text-lg font-bold tracking-tight text-foreground"
        >
          kellenbolger
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              to="/"
              hash={link.hash}
              hashScrollIntoView={{ behavior: "smooth" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
