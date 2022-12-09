import React, { Fragment } from "react";
import MainContainer from "./components/main/MainContainer";
import { CartContextProvider } from "./context/CartContext";
//import useWindowDimensions from "./utils/ScreenUtil";

function App() {
  //const { width, height } = useWindowDimensions();
  //console.log('in App.js width:' + width + ' ::height:' + height);
  return (
    <Fragment>
      <CartContextProvider>
        <MainContainer></MainContainer>
      </CartContextProvider>
    </Fragment>
  );
}

export default App;
