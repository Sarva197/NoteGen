import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container-fluid mt-3 p-5">
      <div className="row justify-content-center text-center">
        <div className="col-12 col-md-8" style={{ lineHeight: "1.8" }}>
          <h1 className="mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            What will you <br />
            <span style={{ color: "#34ab5d" }}>note</span> today?
          </h1>
          <p className="fs-5 ms-md-3">
            Remember everything and tackle any project with your notes, tasks,
            and schedule all in one place.
          </p>
          <button
            className="btn btn-primary p-3 fs-6 mt-3 mb-4"
            style={{ minWidth: "13rem" }}
          >
            Get NoteGen for free
          </button>
          <br />
          <Link to="/login" className="mb-3 fs-5 d-inline-block" style={{ color: "black" }}>
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
