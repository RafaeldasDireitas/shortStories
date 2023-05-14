export default function ErrorMessage({ message }) {
  return (
    <>
      <div
        className="alert alert-warning alert-dismissible fade show text-center"
        role="alert"
      >
        {message}
      </div>
    </>
  );
}
