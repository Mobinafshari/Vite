import React from "react";
import Typogeraphy from "../components/Typogeraphy";
import Child from "./Child";

function Main() {
  return (
    <div>
      <Typogeraphy style={{ color: "green" }}>
        This is the Main Page Bro!
      </Typogeraphy>
      <Child />
    </div>
  );
}

export default Main;
