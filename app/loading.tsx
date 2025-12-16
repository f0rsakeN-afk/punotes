import "./loader.css";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="h-dvh flex items-center justify-center"
    >
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
