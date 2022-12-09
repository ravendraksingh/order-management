import React from "react";
import "./RSModal.css";

const RSModal = (props) => {

    if (!props.show) {
        return null;
    }

    // const closeOnEscapeKeyDown = (e) => {
    //     if ((e.charCode || e.keyCode) === 27) {
    //         props.onClose();
    //     }
    // }

    // useEffect(() => {
    //     document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    //     return function cleanup() {
    //         document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    //     }
    // }, [])

    return (
        <div className="modal">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">{props.title}</div>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    <button className="button" onClick={props.onClose}>Close</button>
                </div>
            </div>    
        </div>
    )
}

export default RSModal;