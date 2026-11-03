// The four drawings of "What they come home with" (home.body.html), markup unchanged.
// The escape bubble's font names the self-hosted Manrope (design-decisions.md).

export const ArtCalm = () => (
  <svg viewBox="0 0 200 150" aria-hidden="true">
    <rect className="mat" x="0" y="118" width="200" height="32" />
    <g className="rings"><circle className="ring" cx="100" cy="80" r="40" /><circle className="ring" cx="100" cy="80" r="40" /><circle className="ring" cx="100" cy="80" r="40" /></g>
    <ellipse className="shadow" cx="100" cy="120" rx="40" ry="5" />
    <g className="kid">
    <path className="gi" d="M62 118c0-12 10-20 24-22h28c14 2 24 10 24 22Z" />
    <ellipse className="sh" cx="74" cy="116" rx="9" ry="3.5" /><ellipse className="sh" cx="126" cy="116" rx="9" ry="3.5" />
    <path className="gi" d="M79 100C76 72 85 62 100 62S124 72 121 100Z" /><path className="sh" d="M106 64c8 4 17 17.1 15 36h-8c2-17.1 -1-28.5 -6-34Z" /><path className="ln" d="M90 64l10 22.04 10-22.04" />
    <path className="lo" d="M78 72c-10 8-10 20-4 30" style={{ strokeWidth: '13' }} /><path className="li" d="M78 72c-10 8-10 20-4 30" style={{ strokeWidth: '8.6' }} /><path className="lo" d="M122 72c10 8 10 20 4 30" style={{ strokeWidth: '13' }} /><path className="li" d="M122 72c10 8 10 20 4 30" style={{ strokeWidth: '8.6' }} />
    <circle className="skin" cx="76" cy="103" r="5.5" /><circle className="skin" cx="124" cy="103" r="5.5" />
    <path className="ink" d="M78.0 96h44v6.5H78.0z" /><path className="ink" d="M96 95l4-4 4 4-4 5z" /><path className="lo" d="M98 103l-3 10M102 103l3 10" style={{ strokeWidth: '3.6' }} />
    <g className="headg"><circle className="skin" cx="100" cy="44" r="17" /><path className="ink" d="M83 42c0-11.899999999999999 7.989999999999999-18.700000000000003 17-18.700000000000003s17 6.800000000000001 17 18.700000000000003c-3.06-5.949999999999999-7.989999999999999-9.01-17-9.01s-13.94 3.06-17 9.01Z" /><path className="ln" d="M90.65 45.7c2.04 2.3800000000000003 4.08 2.3800000000000003 6.12 0M103.23 45.7c2.04 2.3800000000000003 4.08 2.3800000000000003 6.12 0" /><path className="ln" d="M96.26 52.5c2.55 2.3800000000000003 5.1 2.3800000000000003 7.48 0" /><circle className="sh" cx="88.78" cy="50.46" r="2.55" /><circle className="sh" cx="111.22" cy="50.46" r="2.55" /></g>
    </g>
  </svg>
)

export const ArtPosition = () => (
  <svg viewBox="0 0 200 150" aria-hidden="true">
    <rect className="mat" x="0" y="128" width="200" height="22" />
    <ellipse className="shadow" cx="100" cy="130" rx="50" ry="4" />
    <g className="board"><path className="gi" d="M36 112h128a5 5 0 0 1 0 10H36a5 5 0 0 1 0-10z" /><path className="ink" d="M86 122h28l-14 9z" /></g>
    <g className="kid">
      <path className="lo" d="M88 78 72 96l4 15" style={{ strokeWidth: '13' }} /><path className="li" d="M88 78 72 96l4 15" style={{ strokeWidth: '8.6' }} /><path className="lo" d="M112 78l16 18-4 15" style={{ strokeWidth: '13' }} /><path className="li" d="M112 78l16 18-4 15" style={{ strokeWidth: '8.6' }} />
      <ellipse className="ink" cx="74" cy="113" rx="9" ry="3" /><ellipse className="ink" cx="126" cy="113" rx="9" ry="3" />
      <path className="gi" d="M79 82C76 54 85 44 100 44S124 54 121 82Z" /><path className="sh" d="M106 46c8 4 17 17.1 15 36h-8c2-17.1 -1-28.5 -6-34Z" /><path className="ln" d="M90 46l10 22.04 10-22.04" />
      <path className="lo" d="M82 56 52 68" style={{ strokeWidth: '13' }} /><path className="li" d="M82 56 52 68" style={{ strokeWidth: '8.6' }} /><path className="lo" d="M118 56l30 12" style={{ strokeWidth: '13' }} /><path className="li" d="M118 56l30 12" style={{ strokeWidth: '8.6' }} />
      <circle className="skin" cx="50" cy="69" r="5.5" /><circle className="skin" cx="150" cy="69" r="5.5" />
      <path className="ink" d="M82.0 76h36v6.5H82.0z" /><path className="ink" d="M96 75l4-4 4 4-4 5z" /><path className="lo" d="M98 83l-3 10M102 83l3 10" style={{ strokeWidth: '3.6' }} />
      <g className="headg"><circle className="skin" cx="100" cy="30" r="16" /><path className="ink" d="M84 28c0-11.2 7.52-17.6 16-17.6s16 6.4 16 17.6c-2.88-5.6-7.52-8.48-16-8.48s-13.12 2.88-16 8.48Z" /><circle className="ink" cx="93.6" cy="30.96" r="1.76" /><circle className="ink" cx="106.4" cy="30.96" r="1.76" /><path className="ln" d="M96.48 38.0c2.4 2.24 4.8 2.24 7.04 0" /><circle className="sh" cx="89.44" cy="36.08" r="2.4" /><circle className="sh" cx="110.56" cy="36.08" r="2.4" /></g>
    </g>
  </svg>
)

export const ArtEscape = () => (
  <svg viewBox="0 0 200 150" aria-hidden="true">
    <rect className="mat" x="0" y="122" width="200" height="28" />
    <ellipse className="shadow" cx="72" cy="123" rx="48" ry="4" />
    <g className="down">
      <path className="lo" d="M96 110l24-10" style={{ strokeWidth: '13' }} /><path className="li" d="M96 110l24-10" style={{ strokeWidth: '8.6' }} /><path className="lo" d="M98 114l26 4" style={{ strokeWidth: '13' }} /><path className="li" d="M98 114l26 4" style={{ strokeWidth: '8.6' }} />
      <ellipse className="ink" cx="124" cy="99" rx="4" ry="6" transform="rotate(-22 124 99)" /><ellipse className="ink" cx="126" cy="119" rx="6" ry="3.5" />
      <path className="gi" d="M48 104h40c6 0 10 4 10 10v8H48Z" />
      <path className="sh" d="M80 106c5 1 10 6 10 12v4h-10Z" />
      <path className="ln" d="M60 104l8 10" />
      <path className="ink" d="M70 104h5v18h-5z" />
      <path className="lo" d="M54 110c-8 2-12 6-12 12" style={{ strokeWidth: '11' }} /><path className="li" d="M54 110c-8 2-12 6-12 12" style={{ strokeWidth: '6.6' }} />
      <g className="headg"><circle className="skin" cx="36" cy="112" r="11" /><path className="ink" d="M25 110c0-7.699999999999999 5.17-12.100000000000001 11-12.100000000000001s11 4.4 11 12.100000000000001c-1.98-3.8499999999999996-5.17-5.83-11-5.83s-9.02 1.98-11 5.83Z" /><circle className="ink" cx="31.6" cy="112.66" r="1.21" /><circle className="ink" cx="40.4" cy="112.66" r="1.21" /><path className="ln" d="M33.58 117.5c1.65 1.54 3.3 1.54 4.84 0" /></g>
    </g>
    <g className="weight"><path className="gi" d="M24 70c0-10 8-18 18-18h72c10 0 18 8 18 18v18c0 6-4 10-10 10H34c-6 0-10-4-10-10Z" style={{ fill: '#d4d1c9' }} /><path className="ln" d="M42 64h22M112 82h12" style={{ stroke: '#fff', strokeWidth: '3.5' }} /></g>
    <g className="up">
      <ellipse className="shadow" cx="152" cy="124" rx="22" ry="3.5" />
      <path className="lo" d="M146 96l-3 25" style={{ strokeWidth: '13' }} /><path className="li" d="M146 96l-3 25" style={{ strokeWidth: '8.6' }} /><path className="lo" d="M158 96l3 25" style={{ strokeWidth: '13' }} /><path className="li" d="M158 96l3 25" style={{ strokeWidth: '8.6' }} />
      <ellipse className="ink" cx="143" cy="122" rx="7" ry="2.6" /><ellipse className="ink" cx="161" cy="122" rx="7" ry="2.6" />
      <path className="gi" d="M135 98C132 78 140 68 152 68S172 78 169 98Z" /><path className="sh" d="M158 70c8 4 13 13.5 11 28h-8c2-13.5 -1-22.5 -6-26Z" /><path className="ln" d="M142 70l10 17.4 10-17.4" />
      <path className="lo" d="M139 78l-12 12" style={{ strokeWidth: '11' }} /><path className="li" d="M139 78l-12 12" style={{ strokeWidth: '6.6' }} /><path className="lo" d="M165 76l9-26" style={{ strokeWidth: '11' }} /><path className="li" d="M165 76l9-26" style={{ strokeWidth: '6.6' }} />
      <circle className="skin" cx="126" cy="91" r="4.5" /><circle className="skin" cx="175" cy="48" r="4.8" />
      <path className="ink" d="M137.0 93h30v6.5H137.0z" />
      <g className="headg"><circle className="skin" cx="152" cy="56" r="13" /><path className="ink" d="M139 54c0-9.1 6.109999999999999-14.3 13-14.3s13 5.2 13 14.3c-2.34-4.55-6.109999999999999-6.890000000000001-13-6.890000000000001s-10.66 2.34-13 6.890000000000001Z" /><circle className="ink" cx="146.8" cy="56.78" r="1.43" /><circle className="ink" cx="157.2" cy="56.78" r="1.43" /><path className="ln" d="M149.14 62.5c1.95 1.8200000000000003 3.9 1.8200000000000003 5.72 0" /><circle className="sh" cx="143.42" cy="60.94" r="1.95" /><circle className="sh" cx="160.58" cy="60.94" r="1.95" /></g>
      <g className="bubble"><path className="gi" d="M156 14h32a5 5 0 0 1 5 5v13a5 5 0 0 1-5 5h-13l-6 7v-7h-13a5 5 0 0 1-5-5V19a5 5 0 0 1 5-5z" /><text x="172" y="31.5" textAnchor="middle" fontFamily="Manrope Variable,Manrope,sans-serif" fontWeight="800" fontSize="15" fill="#111110">!</text></g>
    </g>
  </svg>
)

export const ArtConfidence = () => (
  <svg viewBox="0 0 200 150" aria-hidden="true">
    <rect className="mat" x="0" y="130" width="200" height="20" />
    <ellipse className="shadow" cx="100" cy="131" rx="30" ry="4" />
    <g className="kid">
      <path className="lo" d="M92 102l-2 24" style={{ strokeWidth: '13' }} /><path className="li" d="M92 102l-2 24" style={{ strokeWidth: '8.6' }} /><path className="lo" d="M108 102l2 24" style={{ strokeWidth: '13' }} /><path className="li" d="M108 102l2 24" style={{ strokeWidth: '8.6' }} />
      <ellipse className="ink" cx="90" cy="127" rx="7.5" ry="2.8" /><ellipse className="ink" cx="110" cy="127" rx="7.5" ry="2.8" />
      <path className="gi" d="M79 102C76 72 85 62 100 62S124 72 121 102Z" /><path className="sh" d="M106 64c8 4 17 18.0 15 38h-8c2-18.0 -1-30.0 -6-36Z" /><path className="ln" d="M90 64l10 23.2 10-23.2" />
      <path className="lo" d="M80 72c-12 8-12 20-2 26" style={{ strokeWidth: '13' }} /><path className="li" d="M80 72c-12 8-12 20-2 26" style={{ strokeWidth: '8.6' }} /><path className="lo" d="M120 72c12 8 12 20 2 26" style={{ strokeWidth: '13' }} /><path className="li" d="M120 72c12 8 12 20 2 26" style={{ strokeWidth: '8.6' }} />
      <circle className="skin" cx="80" cy="99" r="5.5" /><circle className="skin" cx="120" cy="99" r="5.5" />
      <g className="beltg"><path className="gi" d="M78 96h44v7H78z" style={{ strokeWidth: '2' }} /><path className="ink" d="M104 96h18v7h-18z" />
        <rect className="stripe" x="107" y="96" width="2.4" height="7" fill="#fff" /><rect className="stripe" x="111" y="96" width="2.4" height="7" fill="#fff" /><rect className="stripe" x="115" y="96" width="2.4" height="7" fill="#fff" /><rect className="stripe" x="119" y="96" width="2.4" height="7" fill="#fff" />
        <path className="lo" d="M88 103l-4 12M92 103l1 12" style={{ strokeWidth: '4' }} /><path className="li" d="M88 103l-4 12M92 103l1 12" style={{ strokeWidth: '1.6' }} />
      </g>
      <g className="headg"><circle className="skin" cx="100" cy="46" r="17" /><path className="ink" d="M83 44c0-11.899999999999999 7.989999999999999-18.700000000000003 17-18.700000000000003s17 6.800000000000001 17 18.700000000000003c-3.06-5.949999999999999-7.989999999999999-9.01-17-9.01s-13.94 3.06-17 9.01Z" /><circle className="ink" cx="93.2" cy="47.02" r="1.87" /><circle className="ink" cx="106.8" cy="47.02" r="1.87" /><path className="ln" d="M96.26 54.5c2.55 2.3800000000000003 5.1 2.3800000000000003 7.48 0" /><circle className="sh" cx="88.78" cy="52.46" r="2.55" /><circle className="sh" cx="111.22" cy="52.46" r="2.55" /></g>
    </g>
    <g className="spark"><path className="ln" d="M58 40l-6-6M56 54h-8M68 30l-2-8M142 40l6-6M144 54h8M132 30l2-8" style={{ strokeWidth: '2.2' }} /></g>
  </svg>
)
