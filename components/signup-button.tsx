import { Button } from "@/components/ui/button"

export function SignUpButton() {
  return (
    <Button
      variant="ghost"
      className="
        group
        relative
        h-7
        px-4
        bg-zinc-900
        text-white
        font-mono
        text-xs
        uppercase
        tracking-[0.18em]
        rounded-none
        overflow-hidden
        hover:bg-zinc-800
      "
    >
      <span className="relative z-10">Sign Up</span>

      {/* Animated corner borders */}
      <span className="pointer-events-none absolute inset-0">
        {/* top-left */}
        <span className="
          absolute left-0 top-0
          h-[6px] w-[1px] bg-zinc-600
          transition-transform duration-200
          group-hover:-translate-y-1
        " />
        <span className="
          absolute left-0 top-0
          h-[1px] w-[6px] bg-zinc-600
          transition-transform duration-200
          group-hover:-translate-x-1
        " />

        {/* top-right */}
        <span className="
          absolute right-0 top-0
          h-[6px] w-[1px] bg-zinc-600
          transition-transform duration-200
          group-hover:-translate-y-1
        " />
        <span className="
          absolute right-0 top-0
          h-[1px] w-[6px] bg-zinc-600
          transition-transform duration-200
          group-hover:translate-x-1
        " />

        {/* bottom-left */}
        <span className="
          absolute left-0 bottom-0
          h-[6px] w-[1px] bg-zinc-600
          transition-transform duration-200
          group-hover:translate-y-1
        " />
        <span className="
          absolute left-0 bottom-0
          h-[1px] w-[6px] bg-zinc-600
          transition-transform duration-200
          group-hover:-translate-x-1
        " />

        {/* bottom-right */}
        <span className="
          absolute right-0 bottom-0
          h-[6px] w-[1px] bg-zinc-600
          transition-transform duration-200
          group-hover:translate-y-1
        " />
        <span className="
          absolute right-0 bottom-0
          h-[1px] w-[6px] bg-zinc-600
          transition-transform duration-200
          group-hover:translate-x-1
        " />
      </span>
    </Button>
  )
}
