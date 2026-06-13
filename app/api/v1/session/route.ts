import { cookies } from "next/headers";
export const runtime = 'edge';

export async function POST(request: Request) {
  const { idToken } = await request.json();

  if (!idToken) {
    return Response.json({ error: "Missing ID token" }, { status: 400 });
  }

  // Set the cookie (HTTP-only, secure)
  (await cookies()).set({
    name: "authToken",
    value: idToken,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 5, // 5 days
  });

  return Response.json({ success: true });
}

