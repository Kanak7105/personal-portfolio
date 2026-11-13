// Hand-drawn pixel-art icons on a 32x32 grid (crispEdges keeps them chunky).
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 32 32",
  shapeRendering: "crispEdges" as const,
  "aria-hidden": true,
  ...props,
});

export function UserIcon({ size = 32, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="3" y="4" width="26" height="22" fill="#000" />
      <rect x="4" y="5" width="24" height="20" fill="#fff" />
      <rect x="4" y="5" width="24" height="4" fill="#000080" />
      <rect x="11" y="11" width="10" height="6" fill="#f2c08f" />
      <rect x="11" y="10" width="10" height="2" fill="#5a3a1a" />
      <rect x="13" y="13" width="2" height="1" fill="#000" />
      <rect x="17" y="13" width="2" height="1" fill="#000" />
      <rect x="9" y="18" width="14" height="7" fill="#008080" />
      <rect x="5" y="27" width="22" height="2" fill="#808080" />
    </svg>
  );
}

export function FolderIcon({ size = 32, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="2" y="6" width="12" height="4" fill="#000" />
      <rect x="3" y="7" width="10" height="3" fill="#ffe28a" />
      <rect x="2" y="9" width="28" height="19" fill="#000" />
      <rect x="3" y="10" width="26" height="17" fill="#f7d354" />
      <rect x="3" y="10" width="26" height="2" fill="#fff3b0" />
      <rect x="3" y="25" width="26" height="2" fill="#c9a227" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 32, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="11" y="5" width="10" height="5" fill="#000" />
      <rect x="13" y="7" width="6" height="3" fill="#c0c0c0" />
      <rect x="2" y="9" width="28" height="19" fill="#000" />
      <rect x="3" y="10" width="26" height="17" fill="#8b5a2b" />
      <rect x="3" y="10" width="26" height="2" fill="#b07a45" />
      <rect x="3" y="17" width="26" height="1" fill="#5a3a1a" />
      <rect x="14" y="15" width="4" height="5" fill="#000" />
      <rect x="15" y="16" width="2" height="3" fill="#ffd700" />
    </svg>
  );
}

export function ChipIcon({ size = 32, ...p }: P) {
  const pins = [8, 12, 16, 20, 24];
  return (
    <svg {...base(size, p)}>
      {pins.map((v) => (
        <g key={v} fill="#808080">
          <rect x={v - 1} y="2" width="2" height="5" />
          <rect x={v - 1} y="25" width="2" height="5" />
          <rect x="2" y={v - 1} width="5" height="2" />
          <rect x="25" y={v - 1} width="5" height="2" />
        </g>
      ))}
      <rect x="6" y="6" width="20" height="20" fill="#000" />
      <rect x="7" y="7" width="18" height="18" fill="#2b2b2b" />
      <rect x="11" y="11" width="10" height="10" fill="#008080" />
      <rect x="12" y="12" width="8" height="8" fill="#00c0c0" />
      <rect x="8" y="8" width="2" height="2" fill="#c0c0c0" />
    </svg>
  );
}

export function PdfIcon({ size = 32, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="5" y="2" width="19" height="28" fill="#000" />
      <rect x="6" y="3" width="17" height="26" fill="#fff" />
      <rect x="20" y="2" width="7" height="7" fill="#000" />
      <rect x="20" y="3" width="6" height="5" fill="#c0c0c0" />
      <rect x="24" y="8" width="3" height="22" fill="#000" />
      <rect x="23" y="9" width="1" height="20" fill="#fff" />
      {[8, 11, 14].map((y) => (
        <rect key={y} x="8" y={y} width="12" height="1" fill="#808080" />
      ))}
      <rect x="3" y="18" width="20" height="9" fill="#c00000" />
      <text x="5" y="25.5" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#fff">
        PDF
      </text>
    </svg>
  );
}

export function MailIcon({ size = 32, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="2" y="7" width="28" height="19" fill="#000" />
      <rect x="3" y="8" width="26" height="17" fill="#fff8dc" />
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i} fill="#000">
          <rect x={4 + i * 2} y={9 + i} width="2" height="1" />
          <rect x={26 - i * 2} y={9 + i} width="2" height="1" />
        </g>
      ))}
      <rect x="23" y="18" width="5" height="5" fill="#c00000" />
    </svg>
  );
}

export function GithubIcon({ size = 16, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="6" y="6" width="20" height="18" fill="#000" />
      <rect x="6" y="3" width="4" height="4" fill="#000" />
      <rect x="22" y="3" width="4" height="4" fill="#000" />
      <rect x="11" y="12" width="3" height="4" fill="#fff" />
      <rect x="18" y="12" width="3" height="4" fill="#fff" />
      <rect x="12" y="24" width="8" height="5" fill="#000" />
    </svg>
  );
}

export function LinkedinIcon({ size = 16, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="3" y="3" width="26" height="26" fill="#0a66c2" />
      <rect x="7" y="13" width="4" height="12" fill="#fff" />
      <rect x="7" y="7" width="4" height="4" fill="#fff" />
      <rect x="14" y="13" width="4" height="12" fill="#fff" />
      <rect x="18" y="13" width="5" height="4" fill="#fff" />
      <rect x="21" y="15" width="4" height="10" fill="#fff" />
    </svg>
  );
}

export function LogoIcon({ size = 16, ...p }: P) {
  // Original "K" tile used for the Start button and favicon.
  return (
    <svg {...base(size, p)}>
      <rect x="2" y="2" width="28" height="28" fill="#000" />
      <rect x="3" y="3" width="26" height="26" fill="#008080" />
      <rect x="9" y="7" width="4" height="18" fill="#fff" />
      <rect x="13" y="14" width="4" height="4" fill="#fff" />
      <rect x="17" y="10" width="4" height="4" fill="#fff" />
      <rect x="20" y="7" width="4" height="4" fill="#fff" />
      <rect x="17" y="18" width="4" height="4" fill="#fff" />
      <rect x="20" y="21" width="4" height="4" fill="#fff" />
    </svg>
  );
}
