import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  
  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 401 });
  }
  
  return NextResponse.json({ user: data.user, success: true });
}
