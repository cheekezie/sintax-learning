import type { UserI } from '@/interface/user.interface';

export const USER_PROFILE_KEY = 'user_profile';

export function persistUserProfile(user: UserI) {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
}

export function clearUserProfile() {
  localStorage.removeItem(USER_PROFILE_KEY);
}
