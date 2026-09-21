import { BirthdayConfig } from '../types';
import photoManifest from '../../public/photos/manifest.json';

// Curated aesthetic fallback photography (high-res cinematic warm couples & candid moments)
const defaultPhotos = [
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1400&auto=format&fit=crop', // intimate couple sunset
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1400&auto=format&fit=crop', // smiling portrait
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400&auto=format&fit=crop', // candid laughter
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1400&auto=format&fit=crop', // holding hands walking
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop', // portrait glow
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop', // warm golden hour
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1400&auto=format&fit=crop', // coffee date
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1400&auto=format&fit=crop', // seaside moment
];

// Helper to get local photo or fallback
const getPhoto = (index: number): string => {
  const localPhotos = (photoManifest as any)?.photos;
  if (localPhotos && Array.isArray(localPhotos) && localPhotos.length > 0) {
    return localPhotos[index % localPhotos.length].url;
  }
  return defaultPhotos[index % defaultPhotos.length];
};

export const birthdayData: BirthdayConfig = {
  // 1. Personal Names & Date
  herName: "Dhara",
  yourName: "Dharmik Pandav",
  nickname: "Dhingali❤️",
  birthdayDate: "2026-09-22T00:00:00", // Defaulting to today/tomorrow so countdown is live or celebration state

  // 2. Secret Passcode
  passcode: "2304", // Easy 4-digit passcode, easily changeable
  passcodeHint: "The day our favorite story began...",

  // 3. Hero Section
  heroPhoto: getPhoto(0),
  heroSubheading: "To the girl who makes ordinary days feel extraordinary.",
  heroQuote: "Today isn't just your birthday. It's a celebration of you.",

  // 4. "This Is Us" Section
  thisIsUsTitle: "This is us.",
  thisIsUsSubtitle: "Two imperfect souls who somehow fit together like a quiet song.",
  thisIsUsPhotos: [
    getPhoto(1),
    getPhoto(2),
    getPhoto(3),
  ],
  thisIsUsParagraphs: [
    "Some people enter your life quietly, without any grand announcement...",
    "and somehow become your favorite part of every single day.",
    "That's you."
  ],

  // 5. Memory Lane Timeline (Emotional storytelling, alternating layout)
  memories: [
    {
      id: "mem-1",
      title: "The First Spark",
      subtitle: "When everything shifted",
      date: "Chapter 01",
      photoUrl: getPhoto(0),
      caption: "I remember looking at you and realizing that my life was never going to be the same.",
      emotionalNote: "One photo. A thousand unsaid feelings.",
      tag: "Beginning"
    },
    {
      id: "mem-2",
      title: "The Unplanned Coffee Run",
      subtitle: "Just us talking for hours",
      date: "Chapter 02",
      photoUrl: getPhoto(1),
      caption: "Two lukewarm cups of coffee and conversations that made two hours feel like two seconds.",
      emotionalNote: "The moment I knew you were my safe place.",
      tag: "Candid"
    },
    {
      id: "mem-3",
      title: "That Uncontrollable Laughter",
      subtitle: "Tears in our eyes from laughing",
      date: "Chapter 03",
      photoUrl: getPhoto(2),
      caption: "I don't even remember what was so funny. I just remember the sound of your laugh filling the room.",
      emotionalNote: "Somehow, you became my favorite notification.",
      tag: "Pure Joy"
    },
    {
      id: "mem-4",
      title: "The Golden Sunset",
      subtitle: "The world went quiet",
      date: "Chapter 04",
      photoUrl: getPhoto(3),
      caption: "You were watching the sky turn pink and gold. I was just watching you.",
      emotionalNote: "Little moments that quietly became my biggest treasures.",
      tag: "Sunset"
    },
    {
      id: "mem-5",
      title: "Everyday Magic",
      subtitle: "The simplest moments are best",
      date: "Chapter 05",
      photoUrl: getPhoto(4),
      caption: "Sitting side by side doing nothing at all, yet feeling like we have everything in the universe.",
      emotionalNote: "You make ordinary days feel like a movie.",
      tag: "Home"
    }
  ],

  // 6. Polaroid & Scrapbook Section
  polaroids: [
    {
      id: "pol-1",
      photoUrl: getPhoto(1),
      caption: "that smile >>>",
      handwrittenNote: "you being completely yourself",
      rotation: -3.5,
      stickerText: "favorite",
      date: "Always"
    },
    {
      id: "pol-2",
      photoUrl: getPhoto(2),
      caption: "mid-laugh",
      handwrittenNote: "caught in 4K being adorable",
      rotation: 2.8,
      stickerText: "pure joy",
      date: "Summer"
    },
    {
      id: "pol-3",
      photoUrl: getPhoto(3),
      caption: "golden hour",
      handwrittenNote: "the prettiest view in the room",
      rotation: -1.8,
      stickerText: "mine ❤️",
      date: "Golden"
    },
    {
      id: "pol-4",
      photoUrl: getPhoto(4),
      caption: "our quiet walk",
      handwrittenNote: "hand in hand, nowhere else to be",
      rotation: 4.2,
      stickerText: "forever",
      date: "Dusk"
    },
    {
      id: "pol-5",
      photoUrl: getPhoto(5),
      caption: "late night snack run",
      handwrittenNote: "messy hair, zero filter, 100% beauty",
      rotation: -2.5,
      stickerText: "best memory",
      date: "Midnight"
    },
    {
      id: "pol-6",
      photoUrl: getPhoto(6),
      caption: "that little glance",
      handwrittenNote: "the way your eyes crinkle when you're happy",
      rotation: 1.9,
      stickerText: "my heart",
      date: "Cherished"
    }
  ],

  // 7. Reasons I Love You (Interactive Envelope / Flip Cards)
  reasons: [
    {
      id: 1,
      teaser: "Reason 01",
      reason: "Because you make me smile without even trying, just by walking into the room.",
      subtext: "Natural, effortless magic."
    },
    {
      id: 2,
      teaser: "Reason 02",
      reason: "Because being with you feels like coming home after a long, noisy day.",
      subtext: "My deepest peace."
    },
    {
      id: 3,
      teaser: "Reason 03",
      reason: "Because the tiny habits you think are weird are actually my absolute favorite things about you.",
      subtext: "Every quirk is poetry."
    },
    {
      id: 4,
      teaser: "Reason 04",
      reason: "Because you listen not just to what I say, but to what I don't know how to put into words.",
      subtext: "You understand my silence."
    },
    {
      id: 5,
      teaser: "Reason 05",
      reason: "Because your laugh is the warmest, most contagious sound I have ever heard.",
      subtext: "Never stop laughing like that."
    },
    {
      id: 6,
      teaser: "Reason 06",
      reason: "Because you believe in me even when I forget how to believe in myself.",
      subtext: "My quiet anchor."
    },
    {
      id: 7,
      teaser: "Reason 07",
      reason: "Because the way you care about the little things proves how big your heart is.",
      subtext: "Pure kindness in a noisy world."
    },
    {
      id: 8,
      teaser: "Reason 08",
      reason: "Because every road trip, coffee run, and boring chore turns into an adventure with you.",
      subtext: "Ordinary becomes extraordinary."
    },
    {
      id: 9,
      teaser: "Reason 09",
      reason: "Because when you hold my hand, the whole world feels steady and right.",
      subtext: "Just right here."
    },
    {
      id: 10,
      teaser: "Reason 10",
      reason: "Because you're simply, genuinely, unapologetically you—and you are my favorite person on Earth.",
      subtext: "Today and every tomorrow."
    }
  ],

  // 8. Digital Scratch Card Surprise
  scratchCard: {
    heading: "There's something I haven't told you yet...",
    subheading: "Gently scratch away the foil with your finger or mouse",
    hiddenMessage: "You are the most beautiful chapter of my life, and I never want this story to end. ❤️",
    revealNote: "Every word is true. Always."
  },

  // 9. Love Letter (Wax sealed, warm paper, handwritten font)
  loveLetter: {
    salutation: "My Dearest,",
    date: "On your special day",
    paragraphs: [
      "I don't know if words will ever completely explain what you mean to me, but on your birthday, I wanted to try.",
      "Before you came into my life, days were just days—ordinary, passing by. But with you, even the simplest mornings, the quiet car rides, and the silly late-night conversations carry a warmth I never knew I was missing.",
      "You have this quiet strength, this radiant kindness, and a way of making everyone around you feel valued. But to me, you are so much more: you are my best friend, my secret keeper, and the person whose happiness means more to me than my own.",
      "Thank you for being my constant comfort. Thank you for your patience, your warmth, and the gentle way you love me.",
      "I hope this year brings you all the dreams you whisper into the dark, all the laughter your heart can hold, and the quiet assurance of knowing just how deeply, unconditionally you are loved."
    ],
    closing: "With all my heart and forever yours,",
    signature: "Your Love❤️",
    postScript: "P.S. Make sure you leave room for birthday cake..."
  },

  // 10. Our Song (Vinyl player)
  song: {
    title: "Golden Hour Melody",
    artist: "The Soundtrack of Us",
    audioUrl: "/audio/our-song.mp3",
    coverUrl: getPhoto(0),
    lyricsSnippet: "You're the melody I never want to stop playing..."
  },

  // 11. "Things I Want to Do With You" (Bucket List)
  bucketList: [
    {
      id: "bl-1",
      title: "More Sunsets Together",
      description: "Sitting side by side watching the sky melt into dusk, wherever we are in the world.",
      icon: "Sunset",
      tag: "Nature"
    },
    {
      id: "bl-2",
      title: "Random Midnight Drives",
      description: "Windows down, city lights blurring, singing along to songs we only half-know.",
      icon: "Car",
      tag: "Adventure"
    },
    {
      id: "bl-3",
      title: "Getting Lost in a New City",
      description: "Finding hidden coffee shops, small bookstores, and taking polaroids on cobblestone streets.",
      icon: "Compass",
      tag: "Travel"
    },
    {
      id: "bl-4",
      title: "Lazy Sunday Mornings",
      description: "No alarms, freshly brewed coffee, warm blankets, and nowhere we have to rush to.",
      icon: "Coffee",
      tag: "Comfort"
    },
    {
      id: "bl-5",
      title: "Growing Old & Still Laughing",
      description: "Fifty years from now, still sharing stupid inside jokes and teasing each other like teenagers.",
      icon: "Sparkles",
      tag: "Forever"
    }
  ],

  // 12. Locked Future Letter (Time capsule)
  futureLetter: {
    title: "For the future us...",
    unlockDateDescription: "A message kept safe for our next milestone",
    paragraphs: [
      "Wherever life takes us, through every twist, every mountain, and every quiet valley, I promise to keep choosing you.",
      "I hope when we look back on this exact birthday years from now, we'll smile knowing that our story was only just beginning its most beautiful chapters.",
      "Keep this promise close to your heart: you will never have to walk alone."
    ]
  },

  // 13. Final Sequence
  finalSequence: {
    headline: "Before you go...",
    subtext: [
      "I just want you to remember one thing.",
      "You are loved.",
      "More than these pictures can show.",
      "More than these words can explain.",
      "Here's to another year of you...",
      "and hopefully, many more memories of us."
    ],
    climaxPhoto: getPhoto(0),
    celebrationText: "Happy Birthday, My Love ❤️"
  },

  // 14. Easter Eggs
  easterEggs: [
    {
      id: "egg-heart",
      trigger: "heart-tap-5",
      message: "You found something I hid just for you: You are my once-in-a-lifetime. ❤️"
    },
    {
      id: "egg-star",
      trigger: "star-click",
      message: "Okay... you're way too good at finding secrets. I love you! ✨"
    }
  ]
};
