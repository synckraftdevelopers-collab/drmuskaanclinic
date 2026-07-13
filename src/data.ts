import { Service } from "./types";

export const CLINIC_SERVICES: Service[] = [
  {
    id: "hair",
    title: "Hair Restoration",
    tagline: "Regrow and revitalize your hair naturally",
    description: "Combining state-of-the-art trichology treatments with long-term internal homeopathic rejuvenation to target the root cause of hair thinning, baldness, and alopecia.",
    iconName: "Sparkles",
    subServices: [
      {
        name: "Platelet-Rich Plasma (PRP) Therapy",
        description: "An advanced, minimally invasive treatment utilizing your own blood platelets' growth factors to stimulate dormant hair follicles, improve hair density, and halt active hair fall.",
        benefits: ["Increases follicle count and hair shaft thickness", "Safe, natural, and biocompatible", "Virtually zero downtime"],
        duration: "45-60 Mins",
        priceEstimate: "Premium Clinical Care"
      },
      {
        name: "Scalp Mesotherapy",
        description: "Direct micro-infusions of vital nutrients, biotin, vitamins, and hair growth peptides into the mesoderm layer of the scalp to rapidly nourish and activate thinning follicles.",
        benefits: ["Direct follicle nourishment", "Enhances blood circulation in the scalp", "Perfect for early-stage thinning"],
        duration: "30-45 Mins",
        priceEstimate: "Specialized Treatment"
      },
      {
        name: "Customized Anti-Hair-Fall Protocols",
        description: "A dual-action system pairing local high-frequency scalp stimulation and advanced laser growth helmets with customized daily topical applications.",
        benefits: ["Controls excessive shedding within weeks", "Improves scalp environment and health", "Stimulates microcirculation"],
        duration: "30 Mins",
        priceEstimate: "Standard Clinical session"
      },
      {
        name: "Hair Transplant Evaluation & Design",
        description: "Comprehensive digital microscopic scalp analysis, donor area density mapping, hairline aesthetics planning, and custom post-transplant medical optimization.",
        benefits: ["Microscopic follicular unit check", "Personalized hairline aesthetic planning", "Pre- & post-op scalp preparation guides"],
        duration: "45 Mins",
        priceEstimate: "Comprehensive Consultation"
      }
    ],
    homeopathicSynergy: "Homeopathic treatments target internal hormonal imbalances, stress, and nutritional deficits, amplifying the efficacy and longevity of your clinical hair growth therapies."
  },
  {
    id: "skin",
    title: "Skin Care & Aesthetics",
    tagline: "Reveal your skin's natural, youthful radiance",
    description: "Surgical-grade attention without the surgery. We design bespoke aesthetic regimens using advanced clinical treatments to heal, brighten, and contour your skin.",
    iconName: "HeartPulse",
    subServices: [
      {
        name: "Aesthetic Medical Peels",
        description: "Clinically formulated chemical exfoliations (glycolic, salicylic, retinol, and yellow peels) designed to safely remove damaged outer layers, treat hyperpigmentation, and refine skin texture.",
        benefits: ["Reduces dark spots, melasma, and sun damage", "Controls active acne and unclogs pores", "Promotes smooth, glowing skin cell turnover"],
        duration: "30-45 Mins",
        priceEstimate: "Targeted Care"
      },
      {
        name: "Laser Skin Toning & Rejuvenation",
        description: "Precision non-ablative laser therapies that penetrate deep dermal layers to stimulate high-density collagen production, reduce redness, and fade stubborn pigmentations.",
        benefits: ["Smooths fine lines and acne scars", "Evens out skin tone without peeling", "Increases long-term skin elasticity"],
        duration: "45 Mins",
        priceEstimate: "Advanced Laser Care"
      },
      {
        name: "Hydra-Dermabrasion Nourishment",
        description: "A relaxing 4-step medical facial combining deep physical and chemical vacuum exfoliation, painless blackhead extraction, antioxidant dermal bathing, and custom hyaluronic hydration.",
        benefits: ["Deep pore detoxification", "Instant red-carpet skin glow", "Intensely hydrates and plumps skin"],
        duration: "60 Mins",
        priceEstimate: "Luxury Dermal Care"
      },
      {
        name: "Advanced Acne & Scar Therapy",
        description: "A combination program of medical extractions, soothing therapeutic blue light, localized micro-needling, and intensive scar remodeling gels.",
        benefits: ["Calms angry pustules and active lesions", "Breaks down thick fibrous acne scars", "Prevents future cystic breakouts"],
        duration: "60 Mins",
        priceEstimate: "Specialized Clinical Program"
      }
    ],
    homeopathicSynergy: "Rather than masking skin symptoms with heavy topical steroids, homeopathy treats the underlying systemic toxicity, digestive issues, and blood impurities, creating a lasting glow from within."
  },
  {
    id: "homeopathy",
    title: "Homeopathic Medicine",
    tagline: "Holistic, safe, and constitutional healing",
    description: "Rooted in 26+ years of clinical mastery, our classical homeopathic regimens offer individualized, sweet-pill therapies with zero side effects to treat persistent, chronic diseases.",
    iconName: "Activity",
    subServices: [
      {
        name: "Constitutional Consultation",
        description: "An in-depth, 60-minute evaluation mapping your physical, emotional, genetic, and environmental blueprint to prescribe a singular, deeply curative homeopathic remedy.",
        benefits: ["Addresses chronic health conditions from the root", "Improves overall bodily immunity and vital force", "Completely safe for all age groups, including infants"],
        duration: "60 Mins",
        priceEstimate: "Detailed Constitutional Intake"
      },
      {
        name: "Chronic Dermatological Therapy",
        description: "Gentle and permanent homeopathic solutions targeting persistent dermatological issues like stubborn Psoriasis, Eczema, Vitiligo, Hives, and Atopic Dermatitis.",
        benefits: ["Zero dependence on topical steroid creams", "Halts autoimmune attack on skin cells", "Triggers deep natural tissue healing"],
        duration: "30 Mins",
        priceEstimate: "Follow-up consultation"
      },
      {
        name: "Stress & Psychosomatic Care",
        description: "Safe, non-habit-forming homeopathic medicine targeting generalized anxiety, sleep disorders, digestive distress, and stress-triggered health issues.",
        benefits: ["Non-sedative, non-addictive natural relief", "Restores neuro-endocrine equilibrium", "Excellent support for stress-related hair fall"],
        duration: "30 Mins",
        priceEstimate: "Mental Wellness Consultation"
      },
      {
        name: "Pediatric & Immunity Care",
        description: "Sweet, kid-friendly remedies designed to naturally boost a child's delicate immune system, treating recurrent tonsillitis, asthma, food allergies, and skin rashes.",
        benefits: ["Extremely palatable for young children", "Strengthens defense mechanisms naturally", "Avoids recurrent antibiotic abuse"],
        duration: "30 Mins",
        priceEstimate: "Pediatric Care Intake"
      }
    ],
    homeopathicSynergy: "Homeopathy is the ultimate holistic stabilizer. It balances your body's immune intelligence, ensuring that your hair and skin health is maintained for decades, not just weeks."
  }
];

export const DOCTOR_PROFILE = {
  name: "Dr. Mohammad Imran Shaikh",
  title: "Founder & Chief Consultant",
  credentials: "BHMS, PG in Medical Cosmetology & Aesthetics",
  experience: "Over 26 Years of Clinical Practice",
  philosophy: "I believe that true healing and visual confidence can only be achieved when we treat the human body as an integrated whole. By merging the scientific precision of modern medical aesthetics with the natural, systemic balancing power of classical homeopathy, we don't just treat symptoms—we transform lives.",
  specialties: [
    "Aesthetic Medicine & Trichology",
    "Advanced Non-Surgical Hair Regrowth",
    "Chronic and Autoimmune Skin Disorders",
    "Classical Constitutional Homeopathy",
    "Anti-Aging and Dermal Restructuring"
  ],
  bio: "Dr. Mohammad Imran Shaikh is one of Amravati's most respected medical professionals. With over two and a half decades of dedicated clinical experience, he has pioneered a unique hybrid medical approach. Dr. Shaikh initially trained as a classical homeopath, mastering the delicate art of constitutional remedies. Driven by a passion to help patients restore their outward confidence alongside internal health, he specialized in advanced medical cosmetology and trichology. Today, his clinic stands as a leading sanctuary in Amravati, combining top-tier medical hair and skin procedures with sweet homeopathic therapies for permanent, beautiful health.",
  achievements: [
    "Successfully treated over 15,000+ patients in Amravati & Vidarbha region.",
    "Pioneered customized aesthetic-homeopathy integration protocols for alopecia.",
    "Keynote speaker at national dermatological and homeopathic conferences.",
    "Certified trainer in advanced PRP and cosmetic peel techniques."
  ]
};

export const CLINIC_INFO = {
  address: "Muskaan Clinic, Near Irwin Square, Amravati, Maharashtra, India - 444601",
  city: "Amravati",
  state: "Maharashtra",
  country: "India",
  phone: "+91 72125 67890",
  mobile: "+91 94228 12345",
  email: "care@muskaanclinic.com",
  hours: [
    { days: "Monday - Saturday", timings: "10:00 AM - 01:30 PM, 04:30 PM - 08:30 PM" },
    { days: "Sunday", timings: "Closed (Emergency appointments only)" }
  ],
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3727.1855663731115!2d77.75549007604634!3d20.934947991390492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a4b1fc7d2dcf%3A0xc3f8fc8c4593f6ea!2sIrwin%20Square%2C%20Amravati%2C%20Maharashtra%20444601!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

export const CLINIC_FAQS = [
  {
    question: "How does homeopathy help in skin and hair conditions?",
    answer: "Homeopathy works on the law of similars and treats you constitutionally. Skin and hair conditions like acne, psoriasis, eczema, and hair loss are often external manifestations of internal imbalances (e.g., hormonal issues, digestive stress, immune dysregulation). Homeopathy corrects these underlying causes, while medical cosmetology provides rapid, high-quality external improvement."
  },
  {
    question: "Are chemical peels safe? Will they damage my skin?",
    answer: "Yes, our medical-grade chemical peels are highly safe. They are selected based on your precise skin type and administered under Dr. Imran Shaikh's direct clinical supervision. Unlike harsh over-the-counter products, professional peels gently trigger controlled exfoliation, revealing fresh, healthy, undamaged cells underneath."
  },
  {
    question: "When can I expect to see results for hair restoration?",
    answer: "For hair restoration (PRP and customized therapy), active hair shedding usually decreases significantly within 4-6 weeks. New baby hair growth and visible density improvements are typically noticeable within 3-4 months, corresponding to the natural hair follicle growth cycle."
  },
  {
    question: "Can I combine modern medical aesthetics with homeopathy?",
    answer: "Absolutely! This is the core specialty of Muskaan Clinic. Dr. Imran Shaikh has designed specific integrated protocols. For example, a patient receives PRP therapy to rapidly stimulate hair roots externally, while taking sweet constitutional homeopathic pills to balance thyroid or stress hormones internally. This delivers faster, more stable, and permanent results."
  },
  {
    question: "Do you offer online consultations?",
    answer: "Yes! We offer online video consultations for Homeopathic and Trichological analysis for out-of-town patients. However, specialized procedures like PRP, medical peels, and advanced laser toning must be performed in-person at our modern Amravati facility."
  }
];

export const TIME_SLOTS = [
  "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"
];
