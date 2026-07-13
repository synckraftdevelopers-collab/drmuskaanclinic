"use client";

import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase/client";
import { Search, Filter, Phone, Mail, FileText, CheckCircle, Clock, XCircle, Trash2, Edit } from "lucide-react";

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    // Simple check so it doesn't break if Firebase isn't initialized with correct config yet
    if (!db) return;
    
    try {
      const q = query(collection(db, "consultations"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setConsultations(data);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Failed to connect to Firebase. Check configuration.", e);
    }
  }, []);

  const tabs = ["All", "Offline", "Online", "Pending", "Confirmed", "Completed", "Cancelled"];

  const filteredConsultations = consultations.filter(c => {
    if (activeTab === "All") return true;
    if (activeTab === "Offline") return c.consultationMode === "Offline";
    if (activeTab === "Online") return c.consultationMode === "Online";
    if (["Pending", "Confirmed", "Completed", "Cancelled"].includes(activeTab)) {
      return c.status === activeTab;
    }
    return true;
  });

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "consultations", id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this consultation?")) {
      try {
        await deleteDoc(doc(db, "consultations", id));
      } catch (error) {
        console.error("Error deleting consultation:", error);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-charcoal">Consultation Management</h1>
        <div className="relative">
          <Search size={20} className="absolute left-3 top-3 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 bg-white border border-linen rounded-xl focus:outline-none focus:border-slate-teal"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-linen overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-slate-teal text-white shadow-sm"
                : "bg-white text-charcoal/60 hover:bg-linen/50 border border-linen"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Consultation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConsultations.map((c) => (
          <div key={c.id} className="bg-white border border-linen rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-charcoal text-lg">{c.patientName}</h3>
                  <p className="text-xs text-charcoal/60">{c.consultationMode} Consultation</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                  c.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                  c.status === "Confirmed" ? "bg-blue-100 text-blue-800" :
                  c.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                  c.status === "Cancelled" ? "bg-red-100 text-red-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {c.status || "Pending"}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-charcoal/80 mb-4">
                <p><strong>Procedure:</strong> {c.procedure}</p>
                <p><strong>Date & Time:</strong> {c.date} at {c.time}</p>
                <p><strong>Mobile:</strong> {c.mobile}</p>
                {c.consultationMode === "Online" && (
                  <p><strong>Platform:</strong> {c.meetingPlatform}</p>
                )}
              </div>
            </div>
            
            <div className="border-t border-linen pt-4 flex flex-wrap gap-2">
              <button 
                onClick={() => updateStatus(c.id, "Confirmed")}
                className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors tooltip"
                title="Confirm"
              >
                <CheckCircle size={18} />
              </button>
              <button 
                onClick={() => updateStatus(c.id, "Completed")}
                className="p-2 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100 transition-colors tooltip"
                title="Complete"
              >
                <CheckCircle size={18} />
              </button>
              <button 
                onClick={() => updateStatus(c.id, "Cancelled")}
                className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors tooltip"
                title="Cancel"
              >
                <XCircle size={18} />
              </button>
              <button 
                className="p-2 bg-linen/50 text-slate-teal rounded hover:bg-linen transition-colors ml-auto tooltip"
                title="View Details"
              >
                <FileText size={18} />
              </button>
              <button 
                onClick={() => handleDelete(c.id)}
                className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors tooltip"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {filteredConsultations.length === 0 && (
          <div className="col-span-full py-12 text-center text-charcoal/50">
            <p>No consultations found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
