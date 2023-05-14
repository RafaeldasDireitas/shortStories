export default function Header({ children }) {
  return (
    <>
    <div className="container">
      <div className="row mb-5 mt-5">
        <div className="col-md-8 col-xl-6 text-center mx-auto">
          <h2>{children}</h2>
          <p>Here are your latest posts:</p>
        </div>
      </div>
      </div>
    </>
  );
}
