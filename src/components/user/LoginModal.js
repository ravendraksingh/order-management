import React from "react";
import "./LoginModal.css";

const LoginModal = (props) => {

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">{props.title}</div>
                </div>
                <div className="modal-body">{props.children}</div>  
                {/* <button className="btn btn-primary" onClick={props.onClose}>Close</button> */}
            </div>    
        </div>
    )
}

export default LoginModal;