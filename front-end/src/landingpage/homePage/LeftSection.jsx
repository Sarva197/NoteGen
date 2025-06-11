import React from "react";

function LeftSection({ imgUrl, title, Desc, tryDemo, tryName }) {
  return (
    <div className="container mt-5 mb-3 p-3">
      <div className="row d-flex align-items-center justify-content-center flex-wrap">
        <div className="col-12 col-md-6 p-3 d-flex justify-content-center">
          <img
            src={imgUrl}
            alt="product-img"
            style={{ 
              width: "100%", 
              maxWidth: "400px", 
              borderRadius: "2rem", 
              objectFit: "cover" 
            }}
          />
        </div>
        <div
          className="col-12 col-md-5 p-3 d-flex flex-column justify-content-center"
          style={{ lineHeight: "1.7" }}
        >
          <h1 className="fw-semibold">{title}</h1>
          <p>{Desc}</p>
          {tryName?.length > 0 && (
            <a
              href={tryDemo}
              style={{ color: "#387ed1", textDecoration: "none" }}
              className="fw-medium"
            >
              {tryName} <i className="fa-solid fa-arrow-right"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
