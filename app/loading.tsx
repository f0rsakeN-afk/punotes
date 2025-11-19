import "./loader.css";

export default function Loading() {
  const dots = Array.from({ length: 15 });

  return (
    <div role="status" aria-label="Loading" className="h-dvh flex items-center justify-center">
      <aside className="container-loader">
        {dots.map((_, index) => (
          <div
            key={index}
            className="aro"
            style={{ "--s": index } as React.CSSProperties}
          ></div>
        ))}
      </aside>
    </div>
  );
}
