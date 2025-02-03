
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <svg
        className="spinner"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="spinner-track"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path
          className="spinner-indicator"
          fill="currentColor"
          d="M25 5C14.5066 5 6 13.5066 6 24H0C0 10.7452 10.7452 0 25 0V5Z"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;