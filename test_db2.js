require('dotenv').config({ path: '.env.local' });
async function test() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`);
  const json = await res.json();
  const team = json.definitions ? json.definitions.team_members : json.components.schemas.team_members;
  console.log("team_members:", team ? Object.keys(team.properties) : "not found");
}
test();
