export interface PhotoItem {
  id: string;
  url: string;
  filename?: string;
  caption: string;
  date?: string;
  location?: string;
  note?: string;
  aspect?: 'portrait' | 'landscape' | 'square';
  tag?: 'hero' | 'favorite' | 'candid' | 'fun' | 'journey';
}

export interface MemoryItem {
  id: string;
  title: string;
  subtitle: string;
  date?: string;
  photoUrl: string;
  caption: string;
  emotionalNote: string;
  tag?: string;
}

export interface PolaroidItem {
  id: string;
  photoUrl: string;
  caption: string;
  handwrittenNote: string;
  rotation: number; // e.g. -4 to 4 deg
  stickerText?: string;
  date?: string;
}

export interface ReasonItem {
  id: number;
  teaser: string;
  reason: string;
  iconName?: string;
  subtext?: string;
}

export interface BucketListItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag?: string;
}

export interface EasterEgg {
  id: string;
  trigger: string;
  message: string;
}

export interface BirthdayConfig {
  herName: string;
  yourName: string;
  nickname?: string;
  birthdayDate: string; // ISO format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
  passcode: string; // 4-digit secret passcode
  passcodeHint: string;
  
  heroPhoto: string;
  heroSubheading: string;
  heroQuote: string;

  thisIsUsTitle: string;
  thisIsUsSubtitle: string;
  thisIsUsPhotos: string[];
  thisIsUsParagraphs: string[];

  memories: MemoryItem[];
  polaroids: PolaroidItem[];
  reasons: ReasonItem[];
  bucketList: BucketListItem[];

  scratchCard: {
    heading: string;
    subheading: string;
    hiddenMessage: string;
    revealNote: string;
  };

  loveLetter: {
    salutation: string;
    date: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    postScript?: string;
  };

  futureLetter: {
    title: string;
    unlockDateDescription: string;
    paragraphs: string[];
  };

  song: {
    title: string;
    artist: string;
    audioUrl: string;
    coverUrl: string;
    lyricsSnippet?: string;
  };

  voiceNote?: {
    audioUrl: string;
    duration: string;
    note: string;
  };

  finalSequence: {
    headline: string;
    subtext: string[];
    climaxPhoto: string;
    celebrationText: string;
  };

  easterEggs: EasterEgg[];
}
