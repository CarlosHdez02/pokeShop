import React, { Component, ErrorInfo } from 'react';
import './ErrorBoundary.css';
interface Props {
    children: React.ReactNode;
}
interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
declare class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props);
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    handleReload: () => void;
    render(): string | number | boolean | Iterable<React.ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export default ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.d.ts.map