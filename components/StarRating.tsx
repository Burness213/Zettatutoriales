"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { submitRating } from "@/app/actions";

interface StarRatingProps {
  programId: string;
  initialRating: number;
  ratingCount: number;
}

export function StarRating({ programId, initialRating, ratingCount }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [votes, setVotes] = useState(ratingCount);
  const [hover, setHover] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check local storage to prevent duplicate votes
    const voted = localStorage.getItem(`voted_${programId}`);
    if (voted) setHasVoted(true);
  }, [programId]);

  const handleRating = async (value: number) => {
    if (hasVoted || isSubmitting) return;
    
    setIsSubmitting(true);
    // Optimistic UI update
    const newCount = votes + 1;
    const newAvg = ((rating * votes) + value) / newCount;
    
    setRating(Math.round(newAvg * 10) / 10);
    setVotes(newCount);
    setHasVoted(true);
    
    try {
      await submitRating(programId, value);
      localStorage.setItem(`voted_${programId}`, "true");
    } catch (err) {
      // Revert if failed
      setRating(initialRating);
      setVotes(ratingCount);
      setHasVoted(false);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`flex items-center gap-1.5 ${hasVoted ? 'pointer-events-none opacity-80' : ''}`}
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={hasVoted || isSubmitting}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            className={`transition-all duration-200 ${(hover || rating) >= star ? "text-yellow-500 scale-110" : "text-white/20 hover:text-yellow-500/50"}`}
          >
            <Star 
              size={28} 
              fill={(hover || rating) >= star ? "currentColor" : "none"} 
            />
          </button>
        ))}
      </div>
      
      <div className="text-sm font-medium text-white/40">
        {hasVoted ? (
          <span className="text-emerald-400">¡Gracias por tu voto!</span>
        ) : (
          <span>{votes} votos en total</span>
        )}
      </div>
    </div>
  );
}
