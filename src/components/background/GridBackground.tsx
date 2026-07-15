export function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_40%)] mix-blend-screen" />
    </div>
  )
}
