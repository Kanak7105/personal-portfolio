// Decorative desktop wallpaper: a faint code-symbol tile plus a centred retro monitor.
// pointer-events: none so clicks fall through to the desktop surface.
export default function Wallpaper() {
  return (
    <div className="wallpaper absolute inset-0 pointer-events-none" aria-hidden>
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-[30px]">
        <svg width="264" height="214" viewBox="0 0 132 107" shapeRendering="crispEdges">
          {/* bezel */}
          <rect x="0" y="0" width="132" height="88" fill="#0a0a0a" />
          <rect x="0" y="0" width="131" height="87" fill="#fff" />
          <rect x="1" y="1" width="130" height="86" fill="#808080" />
          <rect x="1" y="1" width="129" height="85" fill="#dfdfdf" />
          <rect x="2" y="2" width="128" height="84" fill="#c0c0c0" />
          {/* screen */}
          <rect x="8" y="7" width="116" height="68" fill="#808080" />
          <rect x="9" y="8" width="115" height="67" fill="#000" />
          <g fontFamily="'Courier New', monospace" fontSize="7" fill="#c0c0c0">
            <text x="13" y="19">C:\&gt; whoami</text>
            <text x="13" y="30" fill="#5fff5f">kanak_agrawal</text>
            <text x="13" y="43">C:\&gt; type role.txt</text>
            <text x="13" y="54" fill="#5fff5f">full-stack developer</text>
            <text x="13" y="67">C:\&gt;</text>
          </g>
          <rect className="wp-cursor" x="35" y="62" width="5" height="6" fill="#c0c0c0" />
          {/* power LED + badge */}
          <rect x="114" y="79" width="4" height="2" fill="#00c000" />
          <rect x="12" y="79" width="20" height="3" fill="#808080" />
          {/* stand */}
          <rect x="52" y="88" width="28" height="8" fill="#808080" />
          <rect x="53" y="88" width="26" height="7" fill="#c0c0c0" />
          <rect x="34" y="96" width="64" height="10" fill="#0a0a0a" />
          <rect x="34" y="96" width="63" height="9" fill="#fff" />
          <rect x="35" y="97" width="62" height="8" fill="#c0c0c0" />
        </svg>
        <p className="wp-name">Kanak Agrawal</p>
        <p className="wp-role">Next.js · React · NestJS · MongoDB</p>
      </div>
    </div>
  );
}
