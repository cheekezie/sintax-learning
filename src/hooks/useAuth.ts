import { AuthContext } from '@/contexts';
import type { UserI } from '@/interface/user.interface';
import { setUserProfile } from '@/store/authslice';
import type { RootState } from '@/store';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const USER_PROFILE_KEY = 'user_profile';

export function useAuth() {
  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.auth.profile);

  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  // Hydrate profile from localStorage on first load (e.g. page refresh)
  useEffect(() => {
    if (profile) return;
    const raw = localStorage.getItem(USER_PROFILE_KEY);
    if (!raw) return;
    try {
      dispatch(setUserProfile(JSON.parse(raw) as UserI));
    } catch {
      localStorage.removeItem(USER_PROFILE_KEY);
    }
  }, [dispatch, profile]);

  return { ...ctx, user: profile };
}
