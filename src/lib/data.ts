export type Course = {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    description: string;
    language: string;
    level: string;
    format: string;
    duration_minutes: number;
    price_cents: number;
    currency: string;
    rating: number;
    reviews_count: number;
    students_count: number;
    image_url: string;
    syllabus: string[];
    is_active: boolean;
};

export const courses: Course[] = [
    {
        id: "1",
        slug: "conversational-english",
        title: "Conversational English",
        tagline: "Get fluent in everyday English conversations.",
        description:
            "Build real speaking confidence through structured conversations on everyday topics — work, travel, relationships, and more. Perfect for intermediate learners who know grammar but can't quite speak freely yet.",
        language: "english",
        level: "B1",
        format: "one_on_one",
        duration_minutes: 60,
        price_cents: 2500,
        currency: "usd",
        rating: 4.9,
        reviews_count: 87,
        students_count: 143,
        image_url:
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80",
        syllabus: [
            "Introducing yourself professionally",
            "Small talk & social conversations",
            "Expressing opinions confidently",
            "Work and career discussions",
            "Travel and cultural topics",
            "Idioms and natural expressions",
        ],
        is_active: true,
    },
    {
        id: "2",
        slug: "business-english",
        title: "Business English",
        tagline: "Speak professionally in meetings, emails, and presentations.",
        description:
            "Master the language of business — presentations, negotiations, emails, and meetings. Designed for professionals who need to communicate effectively in English-speaking work environments.",
        language: "english",
        level: "B2",
        format: "one_on_one",
        duration_minutes: 60,
        price_cents: 3500,
        currency: "usd",
        rating: 4.8,
        reviews_count: 64,
        students_count: 98,
        image_url:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
        syllabus: [
            "Business meetings and presentations",
            "Professional email writing",
            "Negotiations and persuasion",
            "Conference calls and video meetings",
            "Networking language",
            "Business writing and reports",
        ],
        is_active: true,
    },
    {
        id: "3",
        slug: "spanish-beginners",
        title: "Spanish for Beginners",
        tagline: "Go from zero to confident in everyday Spanish.",
        description:
            "Start your Spanish speaking journey from scratch. We focus on speaking from day one — no boring grammar drills. You'll be having real conversations faster than you think.",
        language: "spanish",
        level: "A1",
        format: "group",
        duration_minutes: 45,
        price_cents: 1200,
        currency: "usd",
        rating: 4.9,
        reviews_count: 112,
        students_count: 287,
        image_url:
            "https://images.unsplash.com/photo-1526470498-9ae73c665de8?w=600&q=80",
        syllabus: [
            "Greetings and introductions",
            "Numbers, dates and time",
            "Family and people",
            "Food, drink, and shopping",
            "Getting around a city",
            "Present tense conversations",
        ],
        is_active: true,
    },
    {
        id: "4",
        slug: "advanced-spanish",
        title: "Advanced Spanish Discussion",
        tagline: "Master nuance, culture, and native-level fluency.",
        description:
            "For intermediate speakers ready to reach native-like fluency. Deep-dive discussions on culture, current events, literature, and complex topics — all in Spanish.",
        language: "spanish",
        level: "C1",
        format: "one_on_one",
        duration_minutes: 60,
        price_cents: 3000,
        currency: "usd",
        rating: 5.0,
        reviews_count: 31,
        students_count: 45,
        image_url:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        syllabus: [
            "Complex grammar and subjunctive",
            "Regional accents and dialects",
            "Literature and cultural texts",
            "Current events and debate",
            "Idiomatic expressions",
            "Academic and professional Spanish",
        ],
        is_active: true,
    },
];

export const testimonials = [
    {
        id: "1",
        name: "Sarah M.",
        country: "United States",
        course: "Conversational English",
        rating: 5,
        comment:
            "I was always afraid to speak English at work. After 3 months of weekly sessions, I gave my first presentation in English and got a promotion! The tutor is incredibly patient and encouraging.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
        id: "2",
        name: "Carlos R.",
        country: "Mexico",
        course: "Business English",
        rating: 5,
        comment:
            "My company required me to lead English calls with clients in the US. In 6 weeks I went from dreading those calls to actually enjoying them. Best investment I've made in my career.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    {
        id: "3",
        name: "Emma L.",
        country: "France",
        course: "Spanish for Beginners",
        rating: 5,
        comment:
            "I started knowing only 'hola' and 'gracias'. After 2 months of group classes, I survived my entire trip to Barcelona in Spanish! The classes are fun and I made friends with other students.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    {
        id: "4",
        name: "Ji-woo K.",
        country: "South Korea",
        course: "Conversational English",
        rating: 5,
        comment:
            "The 1:1 format is perfect — every session is 100% focused on my struggles. No wasted time. I went from B1 to C1 in about 8 months. My IELTS score improved by 1.5 bands too.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jiwoo",
    },
];

export const blogPosts = [
    {
        id: "1",
        slug: "how-to-improve-english-speaking",
        title: "10 Proven Ways to Improve Your English Speaking Skills",
        excerpt:
            "Struggling to go from 'knowing English' to actually speaking it freely? These evidence-backed techniques will transform your fluency faster than textbooks ever could.",
        cover_image_url:
            "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80",
        tags: ["English", "Speaking Tips", "Fluency"],
        reading_time: 8,
        published_at: "2024-02-15",
        language: "en",
    },
    {
        id: "2",
        slug: "online-tutoring-vs-apps",
        title: "Online Tutoring vs Language Apps: The Honest Comparison",
        excerpt:
            "Duolingo, Babbel, and apps are great — but they can't replace a real conversation partner. Here's when you need a human tutor to actually get fluent.",
        cover_image_url:
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
        tags: ["Learning", "Technology", "Advice"],
        reading_time: 6,
        published_at: "2024-02-08",
        language: "en",
    },
    {
        id: "3",
        slug: "business-english-phrases",
        title: "50 Business English Phrases That Sound Native in Meetings",
        excerpt:
            "Stop translating word-for-word from your native language. These natural phrases will make you sound confident and professional in any business meeting.",
        cover_image_url:
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
        tags: ["Business English", "Phrases", "Professional"],
        reading_time: 10,
        published_at: "2024-01-30",
        language: "en",
    },
];
