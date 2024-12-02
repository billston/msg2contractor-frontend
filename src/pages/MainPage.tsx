import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/auth/LoginButton";
import LogoutButton from "../components/auth/LogoutButton";
import Profile from "../components/auth/Profile";

function MainPage() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <h1>Is Loading</h1>
    }
  
    return (
      <div className="App">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        <Profile />
      </div>
    );
}

export default MainPage;