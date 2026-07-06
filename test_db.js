require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  const { data: events, error: e1 } = await supabase.from('events').select('*').limit(1);
  console.log("Events Error:", e1);
  console.log("Events Data:", events ? Object.keys(events[0] || {}) : null);
  
  const { data: ann, error: e2 } = await supabase.from('announcements').select('*').limit(1);
  console.log("Ann Error:", e2);
  console.log("Ann Data:", ann ? Object.keys(ann[0] || {}) : null);
}

test();
