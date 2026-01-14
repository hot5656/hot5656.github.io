import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAdmin: false,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      const isAdmin = checkIsAdmin(user);
      setState({ user, loading: false, isAdmin });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      const isAdmin = checkIsAdmin(user);
      setState({ user, loading: false, isAdmin });
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}

function checkIsAdmin(user: User | null): boolean {
  if (!user) return false;
  const role = user.app_metadata?.role;
  return role === 'admin';
}
