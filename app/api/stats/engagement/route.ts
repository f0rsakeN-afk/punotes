import { NextResponse } from "next/server";

// Disabled: queries removed Message/Reaction models (chat feature removed)
export async function GET() {
  return NextResponse.json({ message: "Disabled" }, { status: 404 });
}
