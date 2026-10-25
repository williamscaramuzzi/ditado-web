import { ActivityKind } from "./activities";

export default function ActivityIcon({ kind }: { kind: ActivityKind }) {
  return (
    <svg viewBox="0 0 160 140" fill="none" aria-hidden="true" focusable="false" className="activity-illustration">
      <ellipse cx="80" cy="126" rx="49" ry="7" fill="currentColor" opacity=".10" />
      {kind === "palavras" && <>
        <path d="M19 35Q48 25 80 39Q111 25 141 35V110Q109 101 80 116Q49 101 19 110Z" fill="#F58C75" />
        <path d="M25 25Q51 19 80 34V105Q51 91 25 99Z" fill="#FFFDF7" stroke="#D86A55" strokeWidth="3" strokeLinejoin="round" />
        <path d="M80 34Q109 19 135 25V99Q109 91 80 105Z" fill="#FFF4CF" stroke="#D86A55" strokeWidth="3" strokeLinejoin="round" />
        <path d="M38 49L65 55M38 63L65 69M38 77L56 81M95 53L121 46M95 68L121 61M95 83L114 78" stroke="#D99A79" strokeWidth="5" strokeLinecap="round" />
        <path d="M109 24V52L116 46L123 49V22" fill="#7D6AE8" />
        <path d="M13 13L16 20L23 23L16 26L13 33L10 26L3 23L10 20Z" fill="#F7BD4F" />
      </>}
      {kind === "fonemas" && <>
        <path d="M24 26H110Q123 26 123 39V78Q123 91 110 91H64L40 109V91H24Q11 91 11 78V39Q11 26 24 26Z" fill="#4DB99E" />
        <path d="M82 70H138Q149 70 149 81V104Q149 115 138 115H129V127L111 115H82Q71 115 71 104V81Q71 70 82 70Z" fill="#FFD36B" stroke="#FFFDF6" strokeWidth="4" />
        <path d="M30 54H42L57 41V77L42 64H30Z" fill="white" />
        <path d="M69 49Q81 59 69 69M79 40Q101 59 79 78" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <circle cx="91" cy="93" r="4" fill="#946521" /><circle cx="110" cy="93" r="4" fill="#946521" /><circle cx="129" cy="93" r="4" fill="#946521" />
        <path d="M139 22V43M129 32H149" stroke="#6DD2B4" strokeWidth="5" strokeLinecap="round" />
      </>}
      {kind === "letraminuscula" && <>
        <rect x="32" y="17" width="88" height="103" rx="12" fill="#FFFDF6" stroke="#E3AD45" strokeWidth="4" />
        <path d="M46 43H104M46 64H104M46 85H104M46 105H84" stroke="#F0D797" strokeWidth="3" strokeLinecap="round" />
        <path d="M55 15V27M78 15V27M101 15V27" stroke="#B18B39" strokeWidth="5" strokeLinecap="round" />
        <g transform="rotate(32 115 76)">
          <rect x="105" y="30" width="20" height="73" rx="3" fill="#8D7CE8" />
          <path d="M105 45H125V57H105Z" fill="#B8ABFF" />
          <path d="M105 103L115 125L125 103Z" fill="#EDBF8D" /><path d="M111 116L115 125L119 116Z" fill="#51436E" />
          <path d="M105 35V28Q115 18 125 28V35Z" fill="#F495AA" />
        </g>
        <path d="M13 64L16 72L24 75L16 78L13 86L10 78L2 75L10 72Z" fill="#F2B940" />
      </>}
      {kind === "letras" && <>
        <g transform="rotate(-10 51 81)"><rect x="15" y="46" width="66" height="67" rx="13" fill="#6DBCF0" stroke="#4294D2" strokeWidth="3" /><path d="M33 95L47 64H53L66 95M39 84H60" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></g>
        <g transform="rotate(9 108 53)"><rect x="79" y="17" width="61" height="63" rx="13" fill="#FFD477" stroke="#E8B34C" strokeWidth="3" /><path d="M101 39L111 32V65M101 65H121" stroke="#A16C25" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></g>
        <rect x="88" y="86" width="49" height="37" rx="11" fill="#F49CAC" /><path d="M103 97H122M103 111H122" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <circle cx="39" cy="20" r="6" fill="#9E90EC" />
      </>}
      {kind === "relogio" && <>
        <path d="M42 106L33 123M118 106L127 123" stroke="#7560C8" strokeWidth="9" strokeLinecap="round" />
        <path d="M25 39Q15 17 38 12Q55 9 61 25M99 25Q105 9 122 12Q145 17 135 39" fill="#A795F0" />
        <circle cx="80" cy="70" r="52" fill="#A795F0" stroke="#7961CF" strokeWidth="4" /><circle cx="80" cy="70" r="42" fill="#FFFDF8" />
        <path d="M80 34V40M80 100V106M44 70H50M110 70H116" stroke="#B3A4D8" strokeWidth="4" strokeLinecap="round" />
        <path d="M80 70V47M80 70L104 84" stroke="#7560C8" strokeWidth="6" strokeLinecap="round" /><circle cx="80" cy="70" r="6" fill="#F4AA65" />
        <path d="M80 9V17M72 9H88" stroke="#7961CF" strokeWidth="5" strokeLinecap="round" />
      </>}
      {kind === "tabuada" && <>
        <g transform="rotate(-8 80 70)"><rect x="37" y="10" width="86" height="114" rx="16" fill="#F6A0BA" stroke="#D97B99" strokeWidth="3" /><rect x="49" y="24" width="62" height="27" rx="7" fill="#FFF6DC" /><path d="M62 38H72M67 33V43M88 35L96 43M96 35L88 43" stroke="#9B7946" strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2].map(row => [0, 1, 2].map(col => <rect key={row + "-" + col} x={49 + col * 23} y={62 + row * 18} width="16" height="12" rx="4" fill={col === 2 ? "#BE577E" : "#FFF4F7"} />))}</g>
        <path d="M17 51V69M8 60H26M138 91L150 103M150 91L138 103" stroke="#A992E8" strokeWidth="5" strokeLinecap="round" />
      </>}
      {kind === "soma" && <>
        {/* quadradinho com o 3 */}
        <g transform="rotate(-6 30 64)">
          <rect x="10" y="36" width="40" height="56" rx="12" fill="#F6A0BA" stroke="#FFF4F7" strokeWidth="3" />
          <text x="30" y="78" textAnchor="middle" fontSize="40" fontWeight="900"
            fontFamily="Nunito, Arial, sans-serif" fill="#FFFFFF">3</text>
        </g>

        {/* sinal de + */}
        <path d="M80 47V81M63 64H97" stroke="#7bd98f" strokeWidth="10" strokeLinecap="round" />

        {/* quadradinho com o 5 */}
        <g transform="rotate(6 130 64)">
          <rect x="110" y="36" width="40" height="56" rx="12" fill="#FFD87A" stroke="#FFF6DC" strokeWidth="3" />
          <text x="130" y="78" textAnchor="middle" fontSize="40" fontWeight="900"
            fontFamily="Nunito, Arial, sans-serif" fill="#FFFFFF">5</text>
        </g>

        {/* bolinhas coloridas para contar */}
        <circle cx="62" cy="112" r="6" fill="#F6A0BA" />
        <circle cx="80" cy="112" r="6" fill="#A992E8" />
        <circle cx="98" cy="112" r="6" fill="#FFD87A" />

        {/* pequenos + decorativos */}
        <path d="M20 12V26M13 19H27" stroke="#A992E8" strokeWidth="5" strokeLinecap="round" />
        <path d="M138 108V120M132 114H144" stroke="#7bd98f" strokeWidth="5" strokeLinecap="round" />
        <path d="M132 14V24M127 19H137" stroke="#F6A0BA" strokeWidth="4" strokeLinecap="round" />
      </>}
    </svg>
  );
}

