export async function GET() {
  return Response.json({ name: "test complete" });
}

export const runtime = 'edge';