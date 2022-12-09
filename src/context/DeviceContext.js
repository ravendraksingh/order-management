import React, { useState, useEffect } from "react";
import useWindowDimensions from "../utils/ScreenUtil";

let currentdevice = {
  width: "360px",
  height: "740px"
};

const DeviceContext = React.createContext({
    device: currentdevice 
});

export const DeviceContextProvider = (props) => {
  const [device, setDevice] = useState({});
  const deviceDimensions = useWindowDimensions();
  console.log(deviceDimensions);
  
  useEffect(() => {
      setDevice({
        width: deviceDimensions.width,
        height: deviceDimensions.height
      })
    }, []);

  return (
    <DeviceContext.Provider
      value={{
        deviceInfo: device
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
};

export default DeviceContext;
