/**
 * User: minimal early representation.
 * Authentication provider mapping will be added later.
 */
export interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: string;
}
