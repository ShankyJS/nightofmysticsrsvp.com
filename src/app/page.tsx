"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [lightning, setLightning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rainDrops, setRainDrops] = useState<Array<{left: string; delay: string; duration: string; opacity: number}>>([]);

  // Generate rain drops only on client side to avoid hydration mismatch
  useEffect(() => {
    const drops = Array.from({ length: 100 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${0.5 + Math.random() * 0.5}s`,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setRainDrops(drops);
  }, []);

  useEffect(() => {
    // Audio elements
    const rainAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3');
    const thunderAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2800/2800-preview.mp3');
    
    rainAudio.loop = true;
    rainAudio.volume = 0.3;
    thunderAudio.volume = 0.5;

    // Start rain sound
    if (!isMuted) {
      rainAudio.play().catch(e => console.log('Audio autoplay prevented'));
    }

    // Random lightning flashes with thunder
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLightning(true);
        if (!isMuted) {
          thunderAudio.currentTime = 0;
          thunderAudio.play().catch(e => console.log('Thunder sound failed'));
        }
        setTimeout(() => setLightning(false), 100);
        // Double flash effect
        setTimeout(() => {
          setLightning(true);
          setTimeout(() => setLightning(false), 100);
        }, 200);
      }
    }, 3000);

    // Handle mute state changes
    if (isMuted) {
      rainAudio.pause();
    } else {
      rainAudio.play().catch(e => console.log('Audio play prevented'));
    }

    return () => {
      clearInterval(lightningInterval);
      rainAudio.pause();
      thunderAudio.pause();
    };
  }, [isMuted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-stone-950 relative overflow-hidden">
      {/* Lightning Flash Overlay */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-100 z-0 ${
          lightning ? 'opacity-20' : 'opacity-0'
        }`}
        style={{ backgroundColor: '#ffffff' }}
      />

      {/* Rain Effect */}
      <div className="rain-container fixed inset-0 pointer-events-none z-0">
        {rainDrops.map((drop, i) => (
          <div
            key={i}
            className="rain"
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
              opacity: drop.opacity,
            }}
          />
        ))}
      </div>

      {/* Fog/Mist Overlay */}
      <div className="fog-container fixed inset-0 pointer-events-none z-0">
        <div className="fog fog-1" />
        <div className="fog fog-2" />
        <div className="fog fog-3" />
      </div>

      {/* Audio Control Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-8 right-8 z-50 bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800/90 text-mystic-coral border border-mystic-coral/30 rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-110 hover:border-mystic-coral/60"
        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      >
        {isMuted ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      {/* Main Content - Above weather effects */}
      <div className="relative z-10">
      {/* Hero Section with Logo */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/NightofMystics.svg"
              alt="Night of Mystics - A Halloween Party"
              width={600}
              height={400}
              className="mx-auto w-full max-w-md md:max-w-2xl"
              priority
            />
          </div>
          
          <div className="w-32 h-1 bg-mystic-coral mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-stone-200 font-light">
            The Bi-Annual Da Costa Halloween Party
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-6 pb-16">
        {/* Event Details Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Date Card */}
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-mystic-coral/20 text-center hover:border-mystic-coral/40 transition-colors">
              <div className="w-12 h-12 bg-mystic-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-mystic-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-mystic-coral mb-2">When</h3>
              <p className="text-stone-200 font-medium">October 31st, 2025</p>
              <p className="text-stone-300 text-sm mt-1">Doors open 4:00 PM</p>
              <p className="text-stone-300 text-sm">Party: 5:00 PM - 12:00 AM</p>
            </div>

            {/* Location Card */}
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-mystic-coral/20 text-center hover:border-mystic-coral/40 transition-colors">
              <div className="w-12 h-12 bg-mystic-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-mystic-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-mystic-coral mb-2">Where</h3>
              <p className="text-stone-200">34-6833 Livingstone Place</p>
              <p className="text-stone-300 text-sm">Richmond, BC V7C 5T1</p>
              <p className="text-stone-400 text-sm mt-2">
                <a 
                  href="https://maps.google.com/?q=34-6833+Livingstone+Place+Richmond+BC+V7C+5T1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-mystic-coral hover:text-mystic-coral-light hover:underline transition-colors"
                >
                  📍 View on Google Maps
                </a>
              </p>
            </div>

            {/* Fireworks Card */}
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-mystic-coral/20 text-center hover:border-mystic-coral/40 transition-colors md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-mystic-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-mystic-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-mystic-coral mb-2">Fireworks Show</h3>
              <p className="text-stone-200 font-medium">8:30 PM</p>
              <p className="text-stone-300 text-sm mt-1">Don&apos;t miss the spectacular display!</p>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="mb-16 bg-zinc-900/40 rounded-3xl p-8 md:p-12 shadow-xl border border-mystic-coral/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif text-mystic-coral mb-4">
              What to Expect 🎃
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto">
              Get ready for a celebration for the books!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Catering */}
            <div className="bg-zinc-900/40 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🌮</div>
              <h3 className="text-lg font-serif text-stone-200 mb-2">Catering</h3>
              <p className="text-stone-400 text-sm">Mexican Street Tacos</p>
            </div>

            {/* Drinks */}
            <div className="bg-zinc-900/40 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🍹</div>
              <h3 className="text-lg font-serif text-stone-200 mb-2">Drinks</h3>
              <p className="text-stone-400 text-sm">Alcoholic & Non-Alcoholic</p>
              <p className="text-mystic-coral text-xs mt-1">+ Mixologist on Site!</p>
            </div>

            {/* Hookah */}
            <div className="bg-zinc-900/40 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">💨</div>
              <h3 className="text-lg font-serif text-stone-200 mb-2">Hookah Bar</h3>
              <p className="text-stone-400 text-sm">Relax and enjoy</p>
            </div>

            {/* Movie Night */}
            <div className="bg-zinc-900/40 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="text-lg font-serif text-stone-200 mb-2">Movie Night</h3>
              <p className="text-stone-400 text-sm">Spooky screenings</p>
            </div>

            {/* Fireworks */}
            <div className="bg-zinc-900/40 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🎆</div>
              <h3 className="text-lg font-serif text-stone-200 mb-2">Fireworks</h3>
              <p className="text-stone-400 text-sm">Spectacular show at 8:30 PM</p>
            </div>

            {/* Friends */}
            <div className="bg-zinc-900/40 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🎭</div>
              <h3 className="text-lg font-serif text-stone-200 mb-2">Intimate Gathering</h3>
              <p className="text-stone-400 text-sm">Fun times with friends</p>
            </div>
          </div>
        </section>

        {/* Dress Code Section */}
        <section className="mb-16">
          <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-mystic-coral/20 text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-mystic-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-mystic-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-mystic-coral mb-4">Dress Code</h3>
            <p className="text-stone-200 text-lg mb-2">
              Costumes are <span className="text-mystic-coral font-semibold">OPTIONAL</span>
            </p>
            <p className="text-stone-300">
              However, please dress warmly for the fireworks show!
            </p>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="bg-zinc-900/40 rounded-3xl p-8 md:p-12 shadow-xl border border-mystic-coral/30">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-mystic-coral mb-4">
              RSVP ✨
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto mb-8">
              Let us know you&apos;ll be joining us for this mystical night!
            </p>
            
            <div className="bg-zinc-900/60 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-mystic-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-mystic-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-stone-300 mb-6">
                Please confirm your attendance
              </p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfXLCs60FlepVG9ZMjsjzQxKkqh51gPZ6_1wjlG1ir0fkvIoQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mystic-coral hover:bg-mystic-coral-light text-black px-8 py-4 rounded-full font-semibold transition-all inline-block shadow-lg hover:shadow-mystic-coral/20 hover:scale-105 transform duration-200"
              >
                RSVP Now
              </a>
              <p className="text-stone-500 text-xs mt-4">
                Please RSVP by October 25th
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-6 border-t border-mystic-coral/20">
        <p className="text-stone-400 text-sm">
          See you at the Night of Mystics 🔮
        </p>
        <p className="text-mystic-coral text-xs mt-2">
          👁️ Kevin Presents • October 31st, 2025 👁️
        </p>
      </footer>
      </div>
    </div>
  );
}
