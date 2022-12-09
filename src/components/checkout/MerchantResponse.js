import React from "react";
import CryptoJS from "crypto-js";

const MerchantResponse = () => {
    //const { data } = useParams();
    const queryParams = new URLSearchParams(window.location.search);
    const encryptedData = decodeURIComponent(queryParams.get("data"));
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.REACT_APP_ENCRYPTION_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    //console.log("data", decryptedData);

    return (
        <div>
            <h3>Merchant Response</h3>
            <div>
                <p>{decryptedData}</p>
            </div>
        </div>
    );
};


export default MerchantResponse;