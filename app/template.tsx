export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full animate-in fade-in duration-300 ease-out">
            {children}
        </div>
    );
}
