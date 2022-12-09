import { useState } from "react";

const Books = () => {
  const[myname, setMyname] = useState("default name");


  const clickHandler = (event) => {
      setMyname(Math.random().toString());
  }

  return (
    <div>
      <h3>Books page</h3>
      <div>Name: {myname}</div>
      <button onClick={clickHandler}>Click</button>
    </div>
  );
};

export default Books;
