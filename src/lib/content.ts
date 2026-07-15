import { Service, Testimonial } from "../types";

export const CLINIC_INFO = {
  name: "Muskaan Clinic",
  doctor: "Dr. Mohammad Imran Shaikh",
  credentials: "BHMS CCMP Nasik University",
  experience: "26+ Years",
  phone: "8698782272",
  whatsapp: "918698782272",
  email: "drimranshaikhamt@gmail.com",
  address: "Muskaan Clinic, Near Sabunpura Gandhi Chowk, Juna Motor Stand Road, Gandhi Chowk, Amravati-444601, Maharashtra",
  city: "Amravati",
  state: "Maharashtra",
  postalCode: "444601",
  country: "India",
  timings: "Monday – Saturday: 10:00 AM – 2:30 PM, 6:30 PM – 9:30 PM",
  hours: [
    { days: "Monday – Saturday", timings: "10:00 AM – 2:30 PM, 6:30 PM – 9:30 PM" },
    { days: "Sunday", timings: "Closed" }
  ],
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3727.1855663731115!2d77.75549007604634!3d20.934947991390492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a4b1fc7d2dcf%3A0xc3f8fc8c4593f6ea!2sIrwin%20Square%2C%20Amravati%2C%20Maharashtra%20444601!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleBusinessProfileUrl: "https://maps.google.com/?cid=14121633519803131626", // Placeholder local business CID
  socialLinks: {
    facebook: "https://facebook.com/muskaanclinic",
    instagram: "https://instagram.com/muskaanclinic",
    youtube: "https://youtube.com/muskaanclinic"
  }
};

export const CLINIC_CONFIG = {
  beforeAfterApproved: false, // Flag to show/hide before & after gallery as requested by client
  enableStatsCounters: true,
  enableAiGuide: true,
};

export const CLINIC_STATS = [
  { label: "Acne & Skin Peel Recoveries", value: 6000, suffix: "+" },
  { label: "Chronic Homeopathic Cases", value: 5500, suffix: "+" },
  { label: "Patient Satisfaction Rate", value: 90, suffix: "%" }
];

export const CLINIC_SERVICES: Service[] = [
  {
    id: "hair",
    title: "Hair Restoration",
    tagline: "Regrow and revitalize your hair naturally",
    description: "Combining state-of-the-art trichology treatments with long-term internal homeopathic rejuvenation to target the root cause of hair thinning, baldness, and alopecia.",
    iconName: "Sparkles",
    subServices: [
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
        priceEstimate: "Standard Clinical Session"
      },
      {
        name: "Dandruff Treatment",
        description: "Treat persistent dandruff and scalp flaking with personalized medical care. Our treatment helps reduce itching, controls excess scalp oil, eliminates fungal buildup, and restores a healthy scalp environment for stronger hair growth.",
        benefits: ["Controls dandruff and scalp flaking", "Reduces itching and scalp irritation", "Helps prevent hair fall caused by dandruff", "Improves overall scalp hygiene and health"],
        duration: "30–45 Mins",
        priceEstimate: "SCALP HEALTH CARE"
      },
      {
        name: "Keratin Therapy",
        description: "Keratin Therapy is a professional hair treatment that deeply nourishes, repairs damaged hair, reduces frizz, improves shine, and strengthens weak hair strands. It helps restore smooth, healthy, and manageable hair while protecting it from everyday damage.",
        benefits: ["Repairs damaged and weak hair", "Reduces frizz and improves smoothness", "Enhances shine and softness", "Strengthens hair strands and improves manageability"],
        duration: "60–90 Mins",
        priceEstimate: "HAIR SMOOTHENING & REPAIR"
      },
      {
        name: "Saw Palmetto Treatment for Hair Loss",
        description: "Saw Palmetto Treatment is a natural hair restoration approach designed to help reduce hair fall associated with androgenetic hair loss. It supports healthier hair follicles, promotes stronger hair growth, and helps maintain scalp health as part of a personalized hair restoration plan.",
        benefits: ["Helps reduce hair fall naturally", "Supports healthy hair follicle function", "Promotes stronger and healthier hair growth", "Improves overall scalp and hair health"],
        duration: "30–45 Mins",
        priceEstimate: "NATURAL HAIR RESTORATION"
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
        name: "Skin Toning & Rejuvenation",
        description: "Precision non-ablative laser therapies that penetrate deep dermal layers to stimulate high-density collagen production, reduce redness, and fade stubborn pigmentations.",
        benefits: ["Smooths fine lines and acne scars", "Evens out skin tone without peeling", "Increases long-term skin elasticity"],
        duration: "45 Mins",
        priceEstimate: "Advanced Laser Care"
      },
      {
        name: "Advanced Acne & Scar Therapy",
        description: "A combination program of medical extractions, soothing therapeutic blue light, localized micro-needling, and intensive scar remodeling gels.",
        benefits: ["Calms angry pustules and active lesions", "Breaks down thick fibrous acne scars", "Prevents future cystic breakouts"],
        duration: "60 Mins",
        priceEstimate: "Specialized Clinical Program"
      },
      {
        name: "Chemical Peeling",
        description: "Chemical Peeling is a professional skin resurfacing treatment that removes dead skin cells, reduces pigmentation, acne scars, tanning, fine lines, and improves overall skin tone and texture.",
        benefits: ["Reduces acne scars", "Improves pigmentation", "Removes tanning", "Brightens dull skin"],
        duration: "30–45 Mins",
        priceEstimate: "ADVANCED SKIN PEEL THERAPY"
      },
      {
        name: "OxyHydra Facial",
        description: "OxyHydra Facial deeply cleanses, exfoliates, hydrates, and nourishes the skin using oxygen-rich technology to provide healthy, glowing, and refreshed skin.",
        benefits: ["Deep cleansing", "Instant glow", "Hydrates dry skin", "Improves skin elasticity"],
        duration: "45–60 Mins",
        priceEstimate: "DEEP HYDRATION FACIAL"
      },
      {
        name: "Dermabrasion",
        description: "Dermabrasion is an advanced exfoliation procedure that smooths rough skin, improves acne scars, reduces pigmentation, and promotes healthy skin regeneration.",
        benefits: ["Smooths rough skin", "Reduces acne scars", "Improves skin texture", "Stimulates new skin growth"],
        duration: "45–60 Mins",
        priceEstimate: "SKIN RESURFACING"
      },
      {
        name: "Derma Cautery for Warts & Mole Removal",
        description: "A safe and minimally invasive procedure for removing warts, moles, skin tags, and other benign skin growths with minimal discomfort and quick recovery.",
        benefits: ["Safe wart removal", "Mole removal", "Minimal downtime", "Quick healing"],
        duration: "20–40 Mins",
        priceEstimate: "MINOR SKIN PROCEDURE"
      },
      {
        name: "Eczema Treatment",
        description: "Personalized treatment to manage eczema by reducing itching, inflammation, dryness, and recurring flare-ups while restoring healthy skin.",
        benefits: ["Relieves itching", "Controls inflammation", "Restores skin barrier", "Reduces recurrence"],
        duration: "30–45 Mins",
        priceEstimate: "CHRONIC SKIN CARE"
      },
      {
        name: "Fungal Infection Treatment",
        description: "Medical treatment for fungal skin infections to eliminate infection, reduce itching, redness, irritation, and prevent recurrence.",
        benefits: ["Eliminates fungal infection", "Reduces itching", "Relieves redness", "Prevents recurrence"],
        duration: "20–40 Mins",
        priceEstimate: "ANTI-FUNGAL SKIN CARE"
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
        name: "Skin Disease Treatment",
        description: "Comprehensive homeopathic treatment for chronic and acute skin disorders, helping reduce symptoms naturally while improving overall skin health.",
        benefits: ["Treats eczema, psoriasis, fungal infections & dermatitis", "Reduces itching and inflammation", "Promotes healthy skin", "Personalized homeopathic care"],
        duration: "30–45 Mins",
        priceEstimate: "SKIN HEALTH CARE"
      },
      {
        name: "Recurrent Cold, Coryza & Fever",
        description: "Homeopathic treatment to reduce the frequency of recurrent colds, coryza, sore throat, fever, and improve overall immunity.",
        benefits: ["Improves immunity", "Reduces recurrent infections", "Natural symptom relief", "Suitable for all age groups"],
        duration: "20–30 Mins",
        priceEstimate: "IMMUNITY BOOSTER"
      },
      {
        name: "Allergy & Asthma Treatment",
        description: "Personalized homeopathic management of allergic conditions and asthma to improve breathing, reduce allergy symptoms, and prevent recurring attacks.",
        benefits: ["Controls allergic reactions", "Improves breathing", "Reduces asthma attacks", "Supports respiratory health"],
        duration: "30–45 Mins",
        priceEstimate: "RESPIRATORY CARE"
      },
      {
        name: "Backache & Rheumatism Treatment",
        description: "Homeopathic treatment for chronic back pain, joint pain, arthritis, rheumatism, and musculoskeletal discomfort.",
        benefits: ["Relieves chronic pain", "Improves mobility", "Reduces inflammation", "Supports joint health"],
        duration: "30–45 Mins",
        priceEstimate: "PAIN MANAGEMENT"
      },
      {
        name: "Kidney Stone & Renal Care",
        description: "Natural homeopathic treatment to help manage kidney stones and support kidney health under medical supervision.",
        benefits: ["Supports kidney function", "Helps manage kidney stones", "Reduces discomfort", "Personalized treatment"],
        duration: "30–45 Mins",
        priceEstimate: "KIDNEY HEALTH"
      },
      {
        name: "Marital & Sexual Wellness Consultation",
        description: "Private and personalized homeopathic consultation for marital wellness and sexual health concerns in a professional and confidential environment.",
        benefits: ["Confidential consultation", "Personalized treatment", "Improves overall wellness", "Professional guidance"],
        duration: "30–45 Mins",
        priceEstimate: "CONFIDENTIAL CONSULTATION"
      },
      {
        name: "Acidity & Indigestion Treatment",
        description: "Homeopathic treatment for acidity, indigestion, bloating, gastritis, and digestive discomfort using individualized medicines.",
        benefits: ["Relieves acidity", "Improves digestion", "Reduces bloating", "Supports digestive health"],
        duration: "20–30 Mins",
        priceEstimate: "DIGESTIVE HEALTH"
      },
      {
        name: "Buccal Fibrosis & Oral Health Care",
        description: "Homeopathic treatment for Oral Submucous Fibrosis (OSMF), mouth ulcers, reduced mouth opening, and other oral health conditions.",
        benefits: ["Improves mouth opening", "Reduces oral discomfort", "Supports oral tissue healing", "Personalized treatment"],
        duration: "30–45 Mins",
        priceEstimate: "ORAL HEALTH CARE"
      }
    ],
    homeopathicSynergy: "Homeopathy is the ultimate holistic stabilizer. It balances your body's immune intelligence, ensuring that your hair and skin health is maintained for decades, not just weeks."
  },
  {
    id: "infertility",
    title: "Infertility & PCOS",
    tagline: "SPECIALIZED WOMEN'S HEALTH",
    description: "Specialized holistic homeopathic care focusing on women's reproductive health, hormonal balance, and natural fertility support.",
    iconName: "Baby",
    subServices: [
      {
        name: "Female Infertility Treatment",
        description: "Personalized homeopathic treatment designed to support female reproductive health, regulate ovulation, improve hormonal balance, and naturally enhance fertility.",
        benefits: ["Hormonal Balance", "Supports Healthy Ovulation", "Improves Fertility Naturally", "Personalized Treatment Plan"],
        duration: "45–60 Mins",
        priceEstimate: "FERTILITY CARE"
      },
      {
        name: "Male Infertility Treatment",
        description: "Comprehensive homeopathic care focused on improving sperm quality, count, motility, and overall reproductive health.",
        benefits: ["Improves Sperm Count", "Enhances Motility", "Supports Reproductive Health", "Personalized Care"],
        duration: "45–60 Mins",
        priceEstimate: "MEN'S FERTILITY"
      },
      {
        name: "PCOS / PCOD Treatment",
        description: "Natural homeopathic treatment to help manage PCOS and PCOD by improving hormonal balance, regulating menstrual cycles, and reducing associated symptoms.",
        benefits: ["Regular Menstrual Cycles", "Hormonal Balance", "Reduces Acne & Hair Fall", "Supports Healthy Ovarian Function"],
        duration: "45–60 Mins",
        priceEstimate: "HORMONAL CARE"
      },
      {
        name: "Irregular Periods Treatment",
        description: "Treatment focused on regulating menstrual cycles naturally while addressing the root cause of irregular periods.",
        benefits: ["Regular Cycles", "Reduces Menstrual Discomfort", "Hormonal Support", "Improves Overall Women's Health"],
        duration: "30–45 Mins",
        priceEstimate: "WOMEN'S HEALTH"
      },
      {
        name: "Hormonal Imbalance Treatment",
        description: "Personalized homeopathic care for hormonal imbalance affecting menstrual health, metabolism, fertility, and overall wellness.",
        benefits: ["Hormone Regulation", "Improves Energy Levels", "Better Metabolism", "Long-term Wellness"],
        duration: "30–45 Mins",
        priceEstimate: "ENDOCRINE CARE"
      },
      {
        name: "Leucorrhoea Treatment",
        description: "Confidential treatment for abnormal vaginal discharge, infections, and associated gynecological concerns using individualized homeopathic medicines.",
        benefits: ["Treats White Discharge", "Reduces Infection", "Improves Vaginal Health", "Safe Homeopathic Care"],
        duration: "30–45 Mins",
        priceEstimate: "GYNECOLOGICAL CARE"
      },
      {
        name: "Menstrual Pain Management",
        description: "Homeopathic treatment to reduce painful periods, abdominal cramps, back pain, and discomfort during menstruation.",
        benefits: ["Reduces Menstrual Pain", "Less Cramping", "Better Comfort", "Natural Relief"],
        duration: "30–45 Mins",
        priceEstimate: "PAIN RELIEF"
      },
      {
        name: "Pre-Conception Counseling",
        description: "Comprehensive consultation for couples planning pregnancy, including reproductive health evaluation and personalized treatment guidance.",
        benefits: ["Pregnancy Planning", "Healthy Lifestyle Guidance", "Fertility Assessment", "Personalized Consultation"],
        duration: "45–60 Mins",
        priceEstimate: "FAMILY PLANNING"
      }
    ],
    homeopathicSynergy: "Homeopathy provides a safe, natural approach to balancing hormones and improving reproductive health without the side effects of conventional hormonal treatments."
  }
];

export const DOCTOR_PROFILE = {
  name: "Dr. Mohammad Imran Shaikh",
  title: "Founder & Chief Consultant",
  credentials: "BHMS CCMP Nasik University",
  experience: "Over 26 Years of Clinical Practice",
  philosophy: "I believe that true healing and visual confidence can only be achieved when we treat the human body as an integrated whole. By merging the scientific precision of modern medical aesthetics with the natural, systemic balancing power of classical homeopathy, we don't just treat symptomsâ€”we transform lives.",
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

export const GALLERY_CATEGORIES = [
  { id: "clinic", label: "Clinic Interior & Reception" },
  { id: "equipment", label: "Advanced Equipment" },
  { id: "treatment", label: "Treatment Rooms" },
  { id: "certificates", label: "Certifications & Awards" },
  { id: "before_after", label: "Before & After (Patient Progress)", requiresApproval: true }
];

export const GALLERY_IMAGES = [
  {
    id: "g1",
    category: "clinic",
    title: "Reception & Waiting Lounge",
    alt: "Spacious, warm waiting lounge at Muskaan Clinic with comfortable seating and calming aesthetic.",
    icon: "Smile",
    image: "/reception-lounge.jpg"
  },
  {
    id: "g2",
    category: "clinic",
    title: "Doctor's Consulting Suite",
    alt: "Dr. Mohammad Imran Shaikh's professional consultation chamber equipped with digital microscopic hair diagnostic tools.",
    icon: "BookOpen"
  },
  {
    id: "equipment-1",
    category: "equipment",
    title: "High-Frequency Scalp & PRP Stimulator",
    alt: "Advanced high-frequency scalp stimulation machine used for PRP therapies.",
    icon: "Activity",
    image: "/scalp-prp-stimulator.png"
  },
  {
    id: "equipment-2",
    category: "equipment",
    title: "Laser Hair Growth Helmet System",
    alt: "FDA-approved LLLT (Low-Level Laser Therapy) helmet for non-invasive hair follicle stimulation.",
    icon: "Sun",
    image: "/laser-hair-helmet.png"
  },
  {
    id: "treatment-1",
    category: "treatment",
    title: "PRP & Trichology Procedure Bay",
    alt: "Sterile, dedicated environment for performing PRP injections and advanced trichology procedures.",
    icon: "HeartPulse",
    image: "/prp-procedure-bay.jpg",
    fit: "contain"
  },
  {
    id: "treatment-2",
    category: "treatment",
    title: "Cosmetology & Clinical Peels Suite",
    alt: "Private, hygienic setup for administering advanced chemical peels and specialized cosmetological treatments.",
    icon: "Sparkles",
    image: "/clinical-peels-suite.png",
    fit: "contain"
  },
  {
    id: "certificates-1",
    category: "certificates",
    title: "Post Graduate Cosmetology Fellowship",
    alt: "Dr. Imran Shaikh's advanced certification in Medical Cosmetology & Aesthetic Procedures.",
    icon: "Award"
  },
  {
    id: "certificates-2",
    category: "certificates",
    title: "26 Years Clinical Excellence Citation",
    alt: "Award recognizing over 25 years of ethical, dedicated medical service to patients in the Vidarbha region.",
    icon: "Award"
  },
  {
    id: "before_after-1",
    category: "before_after",
    title: "Hair PRP Progression - 3 Months",
    alt: "Microscopic follicular check showing increased hair shaft diameter and density after 3 sessions.",
    icon: "CheckCircle2"
  },
  {
    id: "before_after-2",
    category: "before_after",
    title: "Acne Medical Peel Progression - 6 Weeks",
    alt: "Clinical timeline photo showing significant reduction in active acne lesions and post-inflammatory pigmentation.",
    icon: "CheckCircle2"
  }
];

export const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
];

export const WHY_CHOOSE_US = [
  {
    title: "26+ Years Clinical Mastery",
    description: "Led by Dr. Mohammad Imran Shaikh, a trusted household name in Amravati for comprehensive and ethical medical healing.",
    icon: "Award"
  },
  {
    title: "Integrated Dual Therapy",
    description: "The unique synergy of cutting-edge external aesthetic cosmetology with internal constitutional homeopathy for permanent recoveries.",
    icon: "Activity"
  },
  {
    title: "Surgical Outcomes, No Surgery",
    description: "Advanced PRP, mesotherapy, and clinical chemical peels designed to give hair and skin renewal with zero invasive downtime.",
    icon: "Sparkles"
  }
];

