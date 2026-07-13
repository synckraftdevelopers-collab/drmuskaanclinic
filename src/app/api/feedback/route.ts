import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/server/store";

export async function GET() {
  return NextResponse.json(store.feedbacks);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, rating, comment, service } = body;

  if (!name || !rating || !comment) {
    return NextResponse.json(
      { error: "Name, rating, and comment are required." },
      { status: 400 }
    );
  }

  const newFeedback = {
    id: Date.now().toString(),
    name,
    rating: Number(rating),
    comment,
    service: service || "General Consultation",
    date: new Date().toISOString().split("T")[0],
  };

  store.feedbacks.push(newFeedback);
  return NextResponse.json(newFeedback, { status: 201 });
}
