import React, { Fragment, useState } from "react";
import RSModal from "./RSModal";

const MyModal = (props) => {
  const [show, setShow] = useState(true);

  return (
      <div>
        <button onClick={() => setShow(true)}>Show modal</button>
        <RSModal
          title="My modal title"
          onClose={() => setShow(false)}
          show={show}
        >
          <p>This is the new body</p>
        </RSModal>
      </div>
    );
};

export default MyModal;
