import React, { useState } from 'react';
import { birthdayData } from './data/birthday';
import { OpeningScreen } from './components/OpeningScreen';
import { PasscodeModal } from './components/PasscodeModal';
import { HeroSection } from './components/HeroSection';
import { Countdown } from './components/Countdown';
import { ThisIsUs } from './components/ThisIsUs';
import { Timeline } from './components/Timeline';
import { PolaroidScrapbook } from './components/PolaroidScrapbook';
import { ReasonsCards } from './components/ReasonsCards';
import { SurpriseGame } from './components/SurpriseGame';
import { ScratchCard } from './components/ScratchCard';
import { LoveLetter } from './components/LoveLetter';
import { MusicPlayer, FloatingMusicButton } from './components/MusicPlayer';
import { BucketList } from './components/BucketList';
import { FutureLetter } from './components/FutureLetter';
import { BirthdayCake } from './components/BirthdayCake';
import { FinalSurprise } from './components/FinalSurprise';
import { FloatingNav } from './components/FloatingNav';
import { Lightbox } from './components/Lightbox';
import { FloatingParticles } from './components/FloatingParticles';
import { CursorGlow } from './components/CursorGlow';
import { EasterEggModal } from './components/EasterEggs';
import { soundFx } from './utils/sound';
import { triggerHeartConfetti } from './utils/confetti';

export function App() {
  // Experience stages: 'opening' -> 'passcode' -> 'story'
  const [stage, setStage] = useState<'opening' | 'passcode' | 'story'>('opening');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Lightbox modal state
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    photoUrl: string;
    caption: string;
    currentIndex: number;
  }>({
    isOpen: false,
    photoUrl: '',
    caption: '',
    currentIndex: 0,
  });

  // Easter egg modal
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);
  const [heartClicks, setHeartClicks] = useState(0);

  // All photos flat list for Lightbox navigation
  const allStoryPhotos = [
    birthdayData.heroPhoto,
    ...birthdayData.thisIsUsPhotos,
    ...birthdayData.memories.map((m) => m.photoUrl),
    ...birthdayData.polaroids.map((p) => p.photoUrl),
  ];

  const handleOpenPhoto = (url: string, caption: string) => {
    const idx = allStoryPhotos.indexOf(url);
    setLightbox({
      isOpen: true,
      photoUrl: url,
      caption,
      currentIndex: idx >= 0 ? idx : 0,
    });
  };

  const handleNextPhoto = () => {
    const nextIdx = (lightbox.currentIndex + 1) % allStoryPhotos.length;
    setLightbox((prev) => ({
      ...prev,
      currentIndex: nextIdx,
      photoUrl: allStoryPhotos[nextIdx],
    }));
  };

  const handlePrevPhoto = () => {
    const prevIdx = (lightbox.currentIndex - 1 + allStoryPhotos.length) % allStoryPhotos.length;
    setLightbox((prev) => ({
      ...prev,
      currentIndex: prevIdx,
      photoUrl: allStoryPhotos[prevIdx],
    }));
  };

  // Easter egg: tap heart 5 times
  const handleSecretHeartTap = () => {
    const newCount = heartClicks + 1;
    setHeartClicks(newCount);
    if (newCount >= 5) {
      soundFx.playRomanticChime();
      triggerHeartConfetti();
      setEasterEggMessage("You found something I hid just for you: You are my once-in-a-lifetime. ❤️");
      setHeartClicks(0);
    }
  };

  const handleScrollToStart = () => {
    const usSection = document.getElementById('us');
    if (usSection) {
      usSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayStory = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-charcoal-900 text-ivory-100 overflow-x-hidden">
      {/* 1. Film grain aesthetic overlay */}
      <div className="film-grain" />

      {/* 2. Floating dust & romantic bokeh particles */}
      <FloatingParticles />

      {/* 3. Desktop cursor follower & click heart explosions */}
      <CursorGlow />

      {/* 4. Stage 1: Cinematic Progressive Opening */}
      {stage === 'opening' && (
        <OpeningScreen
          herName={birthdayData.herName}
          onOpen={() => setStage('passcode')}
        />
      )}

      {/* 5. Stage 2: Romantic 4-Digit Passcode */}
      {stage === 'passcode' && (
        <PasscodeModal
          correctPasscode={birthdayData.passcode}
          hint={birthdayData.passcodeHint}
          onSuccess={() => {
            setStage('story');
            setIsPlayingMusic(true);
          }}
          onSkip={() => {
            setStage('story');
            setIsPlayingMusic(true);
          }}
        />
      )}

      {/* 6. Stage 3: The Complete Story Experience */}
      {stage === 'story' && (
        <div id="top" className="relative z-20">
          {/* Floating Music Button (Top Right) */}
          <FloatingMusicButton
            isPlaying={isPlayingMusic}
            onToggle={() => setIsPlayingMusic(!isPlayingMusic)}
          />

          {/* Hidden Secret Heart Logo Easter Egg */}
          <button
            onClick={handleSecretHeartTap}
            className="fixed top-5 left-5 z-40 w-10 h-10 rounded-full flex items-center justify-center text-rose-400/40 hover:text-rose-300 transition-colors"
            title="A secret..."
          >
            ♡
          </button>

          {/* Hero Section */}
          <HeroSection
            herName={birthdayData.herName}
            heroPhoto={birthdayData.heroPhoto}
            subheading={birthdayData.heroSubheading}
            quote={birthdayData.heroQuote}
            onScrollClick={handleScrollToStart}
          />

          {/* Luxury Countdown */}
          <Countdown
            targetDate={birthdayData.birthdayDate}
            herName={birthdayData.herName}
          />

          {/* "This is Us" Depth Section */}
          <ThisIsUs
            title={birthdayData.thisIsUsTitle}
            subtitle={birthdayData.thisIsUsSubtitle}
            photos={birthdayData.thisIsUsPhotos}
            paragraphs={birthdayData.thisIsUsParagraphs}
            onPhotoClick={handleOpenPhoto}
          />

          {/* Memory Lane Timeline */}
          <Timeline
            memories={birthdayData.memories}
            onPhotoClick={handleOpenPhoto}
          />

          {/* Polaroid & Scrapbook Box */}
          <PolaroidScrapbook
            polaroids={birthdayData.polaroids}
            onPhotoClick={handleOpenPhoto}
          />

          {/* Reasons I Love You Cards */}
          <ReasonsCards reasons={birthdayData.reasons} />

          {/* Floating Gifts Mini-Game */}
          <SurpriseGame />

          {/* Digital Scratch Card */}
          <ScratchCard
            heading={birthdayData.scratchCard.heading}
            subheading={birthdayData.scratchCard.subheading}
            hiddenMessage={birthdayData.scratchCard.hiddenMessage}
            revealNote={birthdayData.scratchCard.revealNote}
          />

          {/* Handwritten Love Letter */}
          <LoveLetter
            herName={birthdayData.herName}
            letter={birthdayData.loveLetter}
          />

          {/* Our Song (Vinyl Player) */}
          <MusicPlayer
            song={birthdayData.song}
            isPlaying={isPlayingMusic}
            onTogglePlay={() => setIsPlayingMusic(!isPlayingMusic)}
          />

          {/* Things I Want To Do With You (Bucket List) */}
          <BucketList items={birthdayData.bucketList} />

          {/* For The Future Us (Time Capsule) */}
          <FutureLetter
            title={birthdayData.futureLetter.title}
            unlockDateDescription={birthdayData.futureLetter.unlockDateDescription}
            paragraphs={birthdayData.futureLetter.paragraphs}
          />

          {/* Interactive Birthday Cake */}
          <BirthdayCake />

          {/* Final Cinematic Surprise & Action Buttons */}
          <FinalSurprise
            herName={birthdayData.herName}
            climaxPhoto={birthdayData.finalSequence.climaxPhoto}
            photos={allStoryPhotos}
            onReplay={handleReplayStory}
          />

          {/* Minimal Floating Navigation Indicator */}
          <FloatingNav />

          {/* Fullscreen Photo Lightbox */}
          <Lightbox
            isOpen={lightbox.isOpen}
            photoUrl={lightbox.photoUrl}
            caption={lightbox.caption}
            currentIndex={lightbox.currentIndex}
            totalPhotos={allStoryPhotos.length}
            onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
            onNext={handleNextPhoto}
            onPrev={handlePrevPhoto}
          />

          {/* Easter Egg Modal */}
          {easterEggMessage && (
            <EasterEggModal
              message={easterEggMessage}
              onClose={() => setEasterEggMessage(null)}
            />
          )}
        </div>
      )}
    </main>
  );
}

export default App;
