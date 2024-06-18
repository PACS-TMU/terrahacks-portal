import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return NextResponse.json({ success: true});
}
