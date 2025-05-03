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
          d="M200 320C140 320 100 280 100 220C100 160 140 120 200 120C260 120 300 160 300 220"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
        />
        <path
          d="M200 120V80"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
        />
        <path
          d="M300 220V80"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
        />
        <path
          d="M300 80L250 130"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default PursuitLogo;
