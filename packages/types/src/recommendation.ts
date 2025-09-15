/**
 * Recommendation domain shape (early stub).
 * This will evolve as we introduce persistence & context fields.
 */
export interface Recommendation {
  id: string; // Temporary client-generated id until backend issues real IDs
  movieId: string; // TMDB movie identifier mapping
  fromUserId: string;
  toUserId: string;
  note: string; // "Why should your friend watch this?"
  createdAt: string; // ISO timestamp
}
