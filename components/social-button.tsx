import React from "react"

interface SocialButtonProps {
  href: string
  label: string
  ariaLabel?: string
  title?: string
  className?: string
  style?: React.CSSProperties
  icon?: React.ReactNode
}

export default function SocialButton({
  href,
  label,
  ariaLabel,
  title,
  className = "",
  style,
  icon,
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? label}
      title={title ?? label}
      className={`flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-shadow min-h-[60px] ${className}`}
      style={style}
    >
      {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
      <span className="text-xs leading-none text-center">{label}</span>
    </a>
  )
}
