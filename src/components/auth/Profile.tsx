import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    )
  );
};

export default Profile;
