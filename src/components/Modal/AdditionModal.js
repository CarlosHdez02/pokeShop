import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./AdditionModal.css";
export const AdditionModal = ({ message, isOpen, onClose }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "modal-overlay", children: _jsxs("div", { className: "addition-modal-content", children: [_jsx("button", { onClick: onClose, className: "close-button", children: "\u2716" }), _jsx("h2", { className: "modal-title", children: "Congrats! \uD83C\uDF89" }), _jsxs("p", { className: "modal-message", children: ["You just ", message] })] }) }));
};
export default AdditionModal;
