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
    checkAuthState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        await checkAuthState();
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAuthState() {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;

    if (user) {
      const isAdmin = await checkIsAdmin(user.email!);
      setState({ user, loading: false, isAdmin });
    } else {
      setState({ user: null, loading: false, isAdmin: false });
    }
  }

  return state;
}

async function checkIsAdmin(userEmail: string): Promise<boolean> {
  const { data } = await supabase
    .from('roberthut_site_settings')
    .select('admin_emails')
    .single();

  if (!data?.admin_emails) return false;

  const adminEmails = data.admin_emails as string[];
  return adminEmails.includes(userEmail);
}
