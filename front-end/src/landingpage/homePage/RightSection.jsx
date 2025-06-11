import React from "react";

function RightSection({
  imgUrl,
  productName,
  prodDesc,
  tryDemo = "#",
  tryName = "",
}) {
  return (
    <div className="container mt-5 mb-3 p-5">
      <div className="row d-flex align-items-center justify-content-around ms-4">
        <div
          className="col-md-4 col-sm-12 p-3 d-flex align-items-start justify-content-center flex-column ms-1"
          style={{ lineHeight: "1.7" }}
        >
          <h1 className="fw-semibold">{productName}</h1>
          <p>{prodDesc}</p>
          <div>
            {tryName.length > 0 && (
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
        <div className="col-md-6 col-sm-12 p-3 text-center">
          <img
            src={imgUrl}
            alt={`${productName} image`}
            className="img-fluid rounded-3"
            style={{ maxWidth: "100%", borderRadius: "2rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
