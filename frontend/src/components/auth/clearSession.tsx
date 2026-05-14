// app/api/auth/clear-session/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("auth-storage", "", {
    path: "/",
    maxAge: 0,
    httpOnly: false, // match however you originally set it
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
