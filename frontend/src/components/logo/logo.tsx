import React from "react";
import projectLogo from "./logo.png"; // Tell webpack this JS file uses this image

function ProjectLogo() {
  return (
    <img
      alt="Logo"
      src={projectLogo}
      style={{
        width: 100,
      }}
    />
  );
}

export default ProjectLogo;
