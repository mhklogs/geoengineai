const ACCENT = "#FF3B5C";
const SOFT = "#FF7480";

interface GeoLogoProps {
  size?: number;
  className?: string;
  spin?: boolean;
}

export default function GeoLogo({
  size = 40,
  className = "",
  spin = true,
}: GeoLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke={ACCENT}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle
        cx="24"
        cy="24"
        r="11.5"
        stroke={SOFT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      <g className={spin ? "geo-sweep" : undefined}>
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke={ACCENT}
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeDasharray="2 13"
          strokeOpacity="0.5"
        />
      </g>
      <path
        d="M24 3.5v6M24 38.5v6M3.5 24h6M38.5 24h6"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="1.8" fill={ACCENT} />
      <circle cx="31" cy="16.5" r="2.2" fill={ACCENT} />
      <circle
        cx="31"
        cy="16.5"
        r="4.6"
        stroke={SOFT}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      <path
        d="M31 16.5L37.5 23.5"
        stroke={ACCENT}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}