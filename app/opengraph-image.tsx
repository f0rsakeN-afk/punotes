import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "PuNotes - Purbanchal University Notes & Resources";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#030711", // Dark background (slate-950 approx)
                    backgroundImage: "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                }}
            >
                {/* Glow Effect */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "600px",
                        height: "600px",
                        background: "radial-gradient(circle, rgba(231,64,92,0.15) 0%, transparent 70%)",
                        filter: "blur(40px)",
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px'
                    }}
                >
                    <div style={{ fontSize: 80, fontWeight: 900, color: "white", letterSpacing: '-0.05em' }}>
                        PU
                    </div>
                    <div style={{ fontSize: 80, fontWeight: 900, color: "#E7405C", letterSpacing: '-0.05em' }}>
                        NOTES
                    </div>
                </div>

                <div
                    style={{
                        fontSize: 32,
                        fontWeight: 500,
                        color: "#94a3b8", // slate-400
                        textAlign: "center",
                        maxWidth: "800px",
                        lineHeight: 1.4,
                    }}
                >
                    The Ultimate Resource Hub for Purbanchal University Engineering Students
                </div>

                <div
                    style={{
                        display: 'flex',
                        marginTop: '40px',
                        gap: '20px'
                    }}
                >
                    <div style={{ padding: '10px 20px', backgroundColor: '#1e293b', borderRadius: '12px', color: '#e2e8f0', fontSize: 20 }}>Syllabus</div>
                    <div style={{ padding: '10px 20px', backgroundColor: '#1e293b', borderRadius: '12px', color: '#e2e8f0', fontSize: 20 }}>Notes</div>
                    <div style={{ padding: '10px 20px', backgroundColor: '#1e293b', borderRadius: '12px', color: '#e2e8f0', fontSize: 20 }}>Questions</div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
