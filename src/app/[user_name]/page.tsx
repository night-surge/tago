async function getUserProfile(user_name: string) {
    const res = await fetch(`/api/user/${user_name}`, { cache: "no-store" });
  
    if (!res.ok) return null;
    
    return res.json();
  }
  
  export default async function ProfilePage({ params }: { params: { user_name: string } }) {
    const user = await getUserProfile(params.user_name);
  
    if (!user) return <p>User not found.</p>;
  
    return (
      <div>
        <h1>{user.name}'s Profile</h1>
        <p>Email: {user.email}</p>
        <p>Joined: {user.joinedDate}</p>
        <img src={user.avatar} alt={user.name} width={100} />
      </div>
    );
  }
  