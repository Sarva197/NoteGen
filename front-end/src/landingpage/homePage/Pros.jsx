import React from 'react';

function Pros() {
  return (
    <div className="container">
      <div className="row mt-2" style={{ lineHeight: "1.8" }}>
        <div className="col-12 col-md-6 col-lg-3 p-3 text-center">
          <img src="/images/location.webp" alt="Location icon" style={{ width: '5rem' }} />
          <h3 className="mt-2">Work <br /> Anywhere</h3>
          <p className="fs-5 mt-2">Keep important info handy—your notes sync automatically to all your devices.</p>
        </div>
        <div className="col-12 col-md-6 col-lg-3 p-3 text-center">
          <img src="/images/pin.webp" alt="Pin icon" style={{ width: '5rem' }} />
          <h3 className="mt-2">Remember <br /> everything</h3>
          <p className="fs-5 mt-2">Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
        </div>
        <div className="col-12 col-md-6 col-lg-3 p-3 text-center">
          <img src="/images/check.webp" alt="Check icon" style={{ width: '5rem' }} />
          <h3 className="mt-2">Turn to-do into <br /> done</h3>
          <p className="fs-5 mt-2">Keep important info handy—your notes sync automatically to all your devices.</p>
        </div>
        <div className="col-12 col-md-6 col-lg-3 p-3 text-center">
          <img src="/images/search.webp" alt="Search icon" style={{ width: '5rem' }} />
          <h3 className="mt-2">Find things fast</h3>
          <p className="fs-5 mt-2">Keep important info handy—your notes sync automatically to all your devices.</p>
        </div>
      </div>
    </div>
  );
}

export default Pros;
