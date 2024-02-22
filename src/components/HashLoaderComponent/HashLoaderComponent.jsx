import React from "react";
import { HashLoader } from "react-spinners";

const HashLoaderComponent = () => {
  return (
    <section className="d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 end-0 start-0">
      <HashLoader size={100} color="#625EB8" />
    </section>
  );
};

export default HashLoaderComponent;
