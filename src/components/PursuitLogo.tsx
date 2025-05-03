import React from "react";

interface PursuitLogoProps {
  className?: string;
  size?: number;
}

const PursuitLogo: React.FC<PursuitLogoProps> = ({
  className = "",
  size = 40,
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" fill="#4338FF" />
        <path
          d="M195.5 300C158.5 300 128 269.5 128 232.5C128 195.5 158.5 165 195.5 165C232.5 165 263 195.5 263 232.5"
          stroke="white"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d="M195 165V100"
          stroke="white"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d="M263 232L263 165"
          stroke="white"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d="M263 165L263 100"
          stroke="white"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d="M263 100L223 140"
          stroke="white"
          strokeWidth="30"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default PursuitLogo;
