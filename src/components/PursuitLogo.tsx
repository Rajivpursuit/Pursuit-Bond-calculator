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
        height={size * 0.4}
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0H19.8V7.92H7.92V16.04H17.82V23.96H7.92V40H0V0Z"
          fill="#4338FF"
        />
        <path
          d="M22.77 0H30.69V16.04C30.69 19.4 32.67 23.96 38.61 23.96C44.55 23.96 46.53 19.4 46.53 16.04V0H54.45V16.04C54.45 24.36 49.5 32.08 38.61 32.08C27.72 32.08 22.77 24.36 22.77 16.04V0Z"
          fill="#4338FF"
        />
        <path
          d="M57.42 0H65.34V13.07C65.34 13.07 71.28 6.73 78.21 6.73C85.14 6.73 90.09 11.88 90.09 19.6V40H82.17V21.58C82.17 17.82 79.2 14.85 75.24 14.85C71.28 14.85 68.31 17.82 68.31 21.58V40H60.39V16.04L57.42 0Z"
          fill="#4338FF"
        />
      </svg>
    </div>
  );
};

export default PursuitLogo;
