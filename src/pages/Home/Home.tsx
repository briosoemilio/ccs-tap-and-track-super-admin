import React from "react";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import LoginForm from "./components/LoginForm";

const Home = () => {
  return (
    <ScreenContainer>
      <h1 className="mb-10">Welcome Admin</h1>
      <div>EARIST IT Department CCS Tap and Track admin portal.</div>
      <LoginForm />
    </ScreenContainer>
  );
};

export default Home;
