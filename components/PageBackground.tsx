/**
 * The three drifting gradient orbs behind every page. Fixed, non-interactive,
 * and identical site-wide — kept here so the six pages share one definition.
 */
export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 overflow-hidden">
      {/* Animated gradient orbs with GPU acceleration */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] animate-pulse-slow will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(147,197,253,0.1) 50%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      <div
        className="absolute top-[20%] right-[-20%] w-[1000px] h-[1000px] animate-pulse-slower will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(165,180,252,0.1) 50%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[30%] w-[900px] h-[900px] animate-float will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(167,139,250,0.1) 50%, transparent 70%)',
          filter: 'blur(70px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
    </div>
  )
}
