// In-memory data store for appointments & feedback.
// Uses globalThis so data survives Next.js dev-mode hot reloads within the same process.
// NOTE: this resets whenever the server restarts / on serverless cold starts.
// For real persistence, swap this out for a database.

export interface AppointmentRecord {
  id: string;
  name: string;
  phone: string;
  service: string;
  subService: string;
  date: string;
  time: string;
  status: string;
  notes: string;
}

export interface FeedbackRecord {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

interface Store {
  appointments: AppointmentRecord[];
  feedbacks: FeedbackRecord[];
}

const globalForStore = globalThis as unknown as { __muskaanStore?: Store };

function createInitialStore(): Store {
  return {
    appointments: [
      {
        id: "1",
        name: "Aarav Sharma",
        phone: "+91 98765 43210",
        service: "Hair Restoration",
        subService: "PRP Therapy",
        date: "2026-07-15",
        time: "11:00 AM",
        status: "Confirmed",
        notes: "First time consultation for hair thinning.",
      },
      {
        id: "2",
        name: "Priya Patel",
        phone: "+91 91234 56789",
        service: "Skin Care",
        subService: "Chemical Peel",
        date: "2026-07-16",
        time: "03:30 PM",
        status: "Confirmed",
        notes: "Seeking skin brightening treatment before family event.",
      },
    ],
    feedbacks: [
      {
        id: "1",
        name: "Rahul Deshmukh",
        rating: 5,
        comment:
          "Excellent experience with Dr. Shaikh! My hair fall stopped completely after 3 sessions of PRP and customized homeopathy.",
        service: "Hair & Homeopathy",
        date: "2026-07-02",
      },
      {
        id: "2",
        name: "Sneha Joshi",
        rating: 5,
        comment:
          "The chemical peels did wonders for my hyperpigmentation. Dr. Imran is very patient and explains the science behind every treatment.",
        service: "Skin Care",
        date: "2026-07-05",
      },
    ],
  };
}

export const store: Store = globalForStore.__muskaanStore ?? createInitialStore();

if (!globalForStore.__muskaanStore) {
  globalForStore.__muskaanStore = store;
}
