import React from "react";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { useAuth } from "../../lib/context/AuthenticatedContext";

const NewAdmin = () => {
  const { user } = useAuth();
  return (
    <ScreenContainer>
      <h1>Hello Super Admin: {user?.name}</h1>
      <div className="my-5 flex flex-col gap-5">
        <p>How can I help you today?</p>
        <button>New Admin Account</button>
        <button>Edit Account</button>
      </div>
    </ScreenContainer>
  );
};

export default NewAdmin;
