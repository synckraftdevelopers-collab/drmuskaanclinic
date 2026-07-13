import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/server/store";

export async function GET() {
  return NextResponse.json(store.appointments);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, service, subService, date, time, notes } = body;

  if (!name || !email || !phone || !service || !date || !time) {
    return NextResponse.json(
      { error: "All required fields must be provided." },
      { status: 400 }
    );
  }

  const newAppointment = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    service,
    subService: subService || "General Consultation",
    date,
    time,
    status: "Confirmed",
    notes: notes || "",
  };

  store.appointments.push(newAppointment);
  return NextResponse.json(newAppointment, { status: 201 });
}
