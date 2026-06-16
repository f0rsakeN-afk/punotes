export default function Loading() {
  return (
    <div className="relative w-full min-h-dvh flex items-center justify-center">
      {/* Floating Z animations */}
      <style>{`
        @keyframes swayUpToRight {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          80% {
            opacity: 0.1;
          }
          100% {
            transform: translate(60px, -80px) rotate(25deg);
            opacity: 0;
          }
        }
        .z-float {
          position: absolute;
          font-size: 28px;
          font-weight: 700;
          color: var(--primary);
          opacity: 0;
          pointer-events: none;
          user-select: none;
        }
        .z-float-1 { animation: swayUpToRight 2.5s ease-out infinite; }
        .z-float-2 { animation: swayUpToRight 2.5s ease-out 0.5s infinite; }
        .z-float-3 { animation: swayUpToRight 2.5s ease-out 1s infinite; }
        .z-float-4 { animation: swayUpToRight 2.5s ease-out 1.5s infinite; }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="z-float z-float-1" style={{ top: "15%", left: "10%" }}>Z</span>
        <span className="z-float z-float-2" style={{ top: "30%", right: "12%" }}>Z</span>
        <span className="z-float z-float-3" style={{ top: "55%", left: "5%" }}>Z</span>
        <span className="z-float z-float-4" style={{ top: "70%", right: "8%" }}>Z</span>
      </div>
    </div>
  );
}
