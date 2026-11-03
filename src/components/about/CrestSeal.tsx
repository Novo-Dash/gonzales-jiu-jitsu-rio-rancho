// The crest ring (about.body.html), markup unchanged: the three words turn with the scroll (Crest.tsx).
export const CrestSeal = () => (
  <svg viewBox="0 0 520 520">
          <defs><path id="crestPath" d="M260 64a196 196 0 1 1 0 392a196 196 0 1 1 0-392" /></defs>
          <circle className="crest__o" cx="260" cy="260" r="246" />
          <circle className="crest__o crest__o--thin" cx="260" cy="260" r="232" />
          <circle className="crest__o crest__o--thin" cx="260" cy="260" r="160" />
          <g id="crestRing">
            <text className="crest__t"><textPath href="#crestPath" startOffset="16.667%" textAnchor="middle">COMPETITION</textPath></text>
            <text className="crest__t"><textPath href="#crestPath" startOffset="50%" textAnchor="middle">FAMILY</textPath></text>
            <text className="crest__t"><textPath href="#crestPath" startOffset="83.333%" textAnchor="middle">COMMUNITY</textPath></text>
            <g className="crest__stars"><text><textPath href="#crestPath" startOffset="0%" textAnchor="middle">★</textPath></text><text><textPath href="#crestPath" startOffset="33.333%" textAnchor="middle">★</textPath></text><text><textPath href="#crestPath" startOffset="66.667%" textAnchor="middle">★</textPath></text></g>
          </g>
          <path className="crest__mark" d="M260 2l11 16h-22z" />
        </svg>
)
