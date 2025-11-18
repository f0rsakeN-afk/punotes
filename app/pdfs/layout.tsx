export default function PDFLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <main>{children}</main>
    </div>
  );
}
