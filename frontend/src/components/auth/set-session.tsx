import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const res = NextResponse.json({ success: true });
  res.cookies.set("auth-storage", token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
