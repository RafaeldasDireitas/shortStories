export default function ButtonToggle({ classes, children, onClickToggle }) {
  return (
    <>
      <button className={`btn ${classes}`} onClick={onClickToggle}>
        {children}
      </button>
    </>
  );
}
