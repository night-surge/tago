
async function getUserProfile(user_name: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 
  const res = await fetch(`${baseUrl}/api/user/${user_name}`, { cache: "no-store" });

  if (!res.ok) return null;
  
  return res.json();
}

export default async function ProfilePage({ 
  params 
}: { 
  params: { user_name: string } 
}) {
  const {user_name} = await params;
  const user = await getUserProfile(user_name);

  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <div>
        {user.links.map((link: string) => (
          <p key={link}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
}