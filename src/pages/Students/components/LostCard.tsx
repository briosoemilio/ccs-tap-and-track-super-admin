const LostCard = (props: { onClick: () => void }) => {
  const { onClick } = props;
  const showModal = () => {
    const modal = document?.getElementById("reset_modal");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.showModal();
  };
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
