import React, { Component, ErrorInfo } from 'react';
import './ErrorBoundary.css'

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;        
  errorInfo: ErrorInfo | null; 
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,           
      errorInfo: null        
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
      return (
        <div className="error-overlay">
          <div className="error-modal">
            <div className="error-header">
              <h2 className="error-title">An Error Has Occurred</h2>
              <div className="error-message">
                {this.state.error && (
                  <div className="error-details">
                  </div>
                )}
                <p>
                 Ooops. try reloading
                </p>
              </div>
            </div>
            <button 
              onClick={this.handleReload}
              className="error-button"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;