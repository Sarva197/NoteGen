import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container-fluid mt-5 p-5">
      <div className="row justify-content-center text-center p-5">
        <div className="col-lg-8 col-md-10 col-sm-12" style={{ lineHeight: "1.8" }}>
          <h1 style={{ fontSize: "4rem" }} className="mb-4">
            Why choose NoteGen?
          </h1>
          <p className="fs-5 ms-3">
            With NoteGen, you have everything you need to keep life organized. Use it for note taking, project planning, and to find what you need, when you need it.
          </p>
          <a href="#" className="d-inline-block mt-3 mb-4">
            <button
              className="btn btn-primary p-4 fs-5"
              style={{ width: "15rem" }}
              type="button"
            >
              Get NoteGen free
            </button>
          </a>
          <br />
          <Link to="/login" className="mb-3 fs-5" style={{ color: "black" }}>
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
