import React, { Component } from "react";
import CustomLoader from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <CustomLoader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </>
  );
};

export default Loader;