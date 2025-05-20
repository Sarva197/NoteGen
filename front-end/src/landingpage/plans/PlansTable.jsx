import React from "react";
import Plans from "./Plans";

function PlansTable() {
  return (
    <div className="container">
      <div className="row">
        <Plans
          features={[
            "Create up to 50,000 notes",
            "Create up to 500 notebooks",
            "Sync across 2 devices",
            "2 GB monthly uploads",
          ]}
          planType="Premium"
          midDes="For personal organization"
          btnText="Get premium"
          payMonth="149.00"
          payYear="1,699.00"
        />
        <Plans
          features={[
            "Create up to 50,000 notes",
            "Create up to 500 notebooks",
            "Sync across 2 devices",
            "2 GB monthly uploads",
          ]}
          planType="Co-Share"
          midDes="Share your subscription with friend"
          btnText="Get co-share"
          payMonth="349.00"
          payYear="3,699.00"
        />
        <Plans
          features={[
            "Create up to 50,000 notes",
            "Create up to 500 notebooks",
            "Sync across 2 devices",
            "2 GB monthly uploads",
          ]}
          planType="student"
          midDes="For personal use"
          btnText="Get student"
          payMonth="00.00"
          payYear="00.00"
        />
        <Plans
          features={[
            "Create up to 50,000 notes",
            "Create up to 500 notebooks",
            "Sync across 2 devices",
            "2 GB monthly uploads",
          ]}
          planType="Business"
          midDes="For personal organization"
          btnText="Get Business"
          payMonth="649.00"
          payYear="4,699.00"
        />
      </div>
    </div>
  );
}

export default PlansTable;
