import React from "react";

const BrandLogo = ({ isDark, style = {} }) => {
  const gradientIdUpper = isDark ? "cartGradDark" : "cartGradLight";
  const color1 = "var(--accent-neon)";
  const color2 = "var(--text-secondary)";

  return (
    <svg
      className="logo-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: "all 0.3s ease",
        width: "32px",
        height: "32px",
        display: "inline-block",
        ...style
      }}
    >
      <defs>
        <linearGradient id={gradientIdUpper} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <circle cx="9" cy="21" r="1" fill={isDark ? color1 : color2} stroke="none" />
      <circle cx="20" cy="21" r="1" fill={isDark ? color1 : color2} stroke="none" />
      <path
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        stroke={`url(#${gradientIdUpper})`}
        strokeWidth="2.5"
      />
    </svg>
  );
};

export default BrandLogo;
