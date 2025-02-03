import React from "react";

const LostCard = (props: { onClick: () => void }) => {
  const { onClick } = props;
  const showModal = () => document?.getElementById("reset_modal").showModal();

  return (
    <button
      className="bg-red-600"
      onClick={(event) => {
        event.stopPropagation(); // Prevents triggering row click
        onClick();
        showModal();
      }}
    >
      RESET KEYCARD
    </button>
  );
};

export default LostCard;
