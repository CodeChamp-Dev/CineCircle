/**
 * Cineboard: curated themed list of movies with optional message.
 * Initially minimal; will gain privacy, collaboration & metrics fields.
 */
export interface Cineboard {
  id: string;
  ownerUserId: string;
  title: string;
  description?: string;
  movieIds: string[]; // Ordered list of TMDB IDs
  isPublic: boolean;
  createdAt: string;
}
