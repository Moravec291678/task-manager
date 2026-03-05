function BoardCard({ board }) {
  return (
    <>
      <img src={board.icon} alt={board.title} />
      <h2>{board.title}</h2>
      <p>{board.lastOpened}</p>
    </>
  );
}

export default BoardCard;
