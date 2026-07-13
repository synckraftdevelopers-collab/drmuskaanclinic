"use client";

import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase/client";
import { format, parseISO, isSameDay } from "date-fns";
import dynamic from "next/dynamic";
const DayPicker = dynamic(() => import("react-day-picker").then(mod => mod.DayPicker), { ssr: false });
import "react-day-picker/dist/style.css";

export default function CalendarPage() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (!db) return;
    try {
      const q = query(collection(db, "consultations"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setConsultations(data);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Firebase not initialized yet", e);
    }
  }, []);

  const selectedAppointments = consultations.filter(c => {
    if (!c.date || !selectedDate) return false;
    const appDate = parseISO(c.date);
    return isSameDay(appDate, selectedDate);
  });

  // Highlight days with appointments
  const modifiers = {
    booked: consultations.map(c => parseISO(c.date)).filter(d => !isNaN(d.getTime()))
  };

  const modifiersStyles = {
    booked: {
      color: 'white',
      backgroundColor: '#0D4C3F',
      fontWeight: 'bold',
      borderRadius: '50%'
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-serif font-bold text-charcoal">Appointment Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-linen p-6 rounded-2xl shadow-sm col-span-1">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="mx-auto"
          />
          <div className="mt-6 space-y-2 border-t border-linen pt-4">
            <h4 className="font-bold text-charcoal text-sm uppercase tracking-wider">Legend</h4>
            <div className="flex items-center space-x-2 text-xs text-charcoal/70">
              <span className="w-3 h-3 rounded-full bg-slate-teal"></span>
              <span>Has Appointments</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-charcoal/70 mt-1">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span>Selected Date</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-linen p-6 rounded-2xl shadow-sm col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold text-charcoal mb-4">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : "Select a date"}
          </h2>
          
          {selectedAppointments.length === 0 ? (
            <div className="text-center py-10 text-charcoal/50">
              No appointments scheduled for this date.
            </div>
          ) : (
            <div className="space-y-4">
              {selectedAppointments.map(app => (
                <div key={app.id} className="border border-linen rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-slate-teal/10 rounded-xl flex flex-col items-center justify-center text-slate-teal">
                      <span className="text-xs font-bold uppercase">{app.time.split(' ')[1]}</span>
                      <span className="text-lg font-bold">{app.time.split(' ')[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal">{app.patientName}</h4>
                      <p className="text-sm text-charcoal/70">{app.consultationMode} • {app.procedure}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      app.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      app.status === "Confirmed" ? "bg-blue-100 text-blue-800" :
                      app.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                      app.status === "Cancelled" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {app.status || "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
