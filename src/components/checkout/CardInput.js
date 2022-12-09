import React from "react";
import { useState } from "react";

const CardInput = () => {
  const [ccNumber, setCcNumber] = useState("4239 2779 3718 7392");

  const formatAndSetCcNumber = (e) => {
    const inputVal = e.target.value.replace(/ /g, "");
    let inputNumbersOnly = inputVal.replace(/\D/g, "");

    if (inputNumbersOnly.length > 16) {
      inputNumbersOnly = inputNumbersOnly.substr(0, 16);
    }

    const splits = inputNumbersOnly.match(/.{1,4}/g);

    let spacedNumber = "";
    if (splits) {
      spacedNumber = splits.join(" ");
    }

    setCcNumber(spacedNumber);
  };

  return (
    <>
      <input
        id="cardnuber"
        type="text"
        value={ccNumber}
        onChange={formatAndSetCcNumber}
        onBlur={formatAndSetCcNumber}
      />
    </>
  );
};

export default CardInput;
