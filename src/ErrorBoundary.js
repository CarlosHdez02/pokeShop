import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import './ErrorBoundary.css';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error: ', error, errorInfo);
        this.setState({
            hasError: true,
            error,
            errorInfo
        });
    }
    handleReload = () => {
        window.location.reload();
    };
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "error-overlay", children: _jsxs("div", { className: "error-modal", children: [_jsxs("div", { className: "error-header", children: [_jsx("h2", { className: "error-title", children: "An Error Has Occurred" }), _jsxs("div", { className: "error-message", children: [this.state.error && (_jsx("div", { className: "error-details" })), _jsx("p", { children: "Ooops. try reloading" })] })] }), _jsx("button", { onClick: this.handleReload, className: "error-button", children: "Reload Page" })] }) }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
