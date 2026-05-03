'use client';

import { useEffect, useState } from 'react';

export default function StarWarsBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-starwars-black via-starwars-blue/30 to-starwars-black" />

      {/* Animated stars - layer 1 (slow, large) */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Animated stars - layer 2 (medium) */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle-medium"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.4 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Animated stars - layer 3 (fast, small) */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={`small-${i}`}
            className="absolute w-px h-px bg-white rounded-full animate-twinkle-fast"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Nebula effect - left */}
      <div
        className="absolute left-0 top-1/4 w-96 h-96 rounded-full opacity-10 animate-nebula-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(139, 0, 0, 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Nebula effect - right */}
      <div
        className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full opacity-10 animate-nebula-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 50, 139, 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animationDelay: '2s',
        }}
      />

      {/* Floating dust particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute w-0.5 h-0.5 bg-starwars-gold/20 rounded-full animate-float-linear"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes twinkle-medium {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        @keyframes twinkle-fast {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; }
        }
        @keyframes nebula-pulse {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        @keyframes float-linear {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-30px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
}