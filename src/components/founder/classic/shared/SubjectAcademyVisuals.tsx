import type {
  SubjectHomeEcosystemStep,
  SubjectHomeVisualKind,
} from "@/lib/subject-home-definitions";

function withAlpha(hex: string, alpha: number) {
  const sanitized = hex.replace("#", "");
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : sanitized;

  const value = Number.parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface SubjectFocusVisualProps {
  kind: SubjectHomeVisualKind;
  accentColor: string;
}

function VisualLabel({
  x,
  y,
  label,
  tone,
}: {
  x: number;
  y: number;
  label: string;
  tone: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-44}
        y={-14}
        width={88}
        height={28}
        rx={14}
        fill="rgba(255,255,255,0.92)"
        stroke={tone}
        strokeOpacity={0.2}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill="#1d2126"
        fontSize="11"
        fontWeight="600"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

export function SubjectFocusVisual({
  kind,
  accentColor,
}: SubjectFocusVisualProps) {
  const soft = withAlpha(accentColor, 0.14);
  const mid = withAlpha(accentColor, 0.24);
  const line = withAlpha(accentColor, 0.56);

  const sharedProps = {
    role: "img",
    viewBox: "0 0 320 220",
    className: "h-full w-full",
    "aria-label": `${kind} academy focal visual`,
  } as const;

  switch (kind) {
    case "strategy":
      return (
        <svg {...sharedProps}>
          <defs>
            <linearGradient
              id="strategyGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <circle cx="160" cy="110" r="72" fill={soft} />
          <path
            d="M96 108c0-34 26-60 64-60 17 0 32 5 44 15M223 95c1 38-24 67-63 67-17 0-33-6-45-16M103 129c-7-6-12-13-16-22M221 78c5 7 8 14 10 23"
            fill="none"
            stroke="url(#strategyGradient)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="160" cy="110" r="24" fill="white" stroke={mid} />
          <text
            x="160"
            y="116"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="14"
            fontWeight="700"
          >
            Decide
          </text>
          <VisualLabel x={160} y={42} label="Scan" tone={accentColor} />
          <VisualLabel x={244} y={110} label="Frame" tone={accentColor} />
          <VisualLabel x={160} y={178} label="Review" tone={accentColor} />
          <VisualLabel x={74} y={110} label="Sequence" tone={accentColor} />
        </svg>
      );
    case "product":
      return (
        <svg {...sharedProps}>
          <rect x="58" y="42" width="204" height="136" rx="30" fill={soft} />
          <path
            d="M160 52 246 110 160 168 74 110Z"
            fill="white"
            stroke={mid}
            strokeWidth="2"
          />
          <path
            d="M160 52v116M74 110h172"
            stroke={line}
            strokeWidth="3"
            strokeDasharray="6 8"
          />
          <VisualLabel x={160} y={34} label="Discover" tone={accentColor} />
          <VisualLabel x={160} y={186} label="Ship" tone={accentColor} />
          <VisualLabel x={58} y={110} label="Prioritise" tone={accentColor} />
          <VisualLabel x={262} y={110} label="Prototype" tone={accentColor} />
          <circle
            cx="160"
            cy="110"
            r="22"
            fill={accentColor}
            fillOpacity="0.14"
            stroke={mid}
          />
          <text
            x="160"
            y="115"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="13"
            fontWeight="700"
          >
            Learn
          </text>
        </svg>
      );
    case "sales":
      return (
        <svg {...sharedProps}>
          <rect x="52" y="36" width="216" height="150" rx="28" fill={soft} />
          {[
            { x: 76, y: 60, w: 168, h: 18, label: "Prospect" },
            { x: 92, y: 88, w: 136, h: 18, label: "Discover" },
            { x: 108, y: 116, w: 104, h: 18, label: "Present" },
            { x: 124, y: 144, w: 72, h: 18, label: "Close" },
          ].map((item) => (
            <g key={item.label}>
              <rect
                x={item.x}
                y={item.y}
                width={item.w}
                height={item.h}
                rx={9}
                fill="white"
                stroke={mid}
              />
              <text
                x={item.x + item.w / 2}
                y={item.y + 12}
                textAnchor="middle"
                fill="#1d2126"
                fontSize="11"
                fontWeight="600"
              >
                {item.label}
              </text>
            </g>
          ))}
          <path
            d="M64 172c40-18 78-27 114-27 32 0 63 7 93 22"
            fill="none"
            stroke={line}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="250" cy="171" r="18" fill="white" stroke={mid} />
          <text
            x="250"
            y="176"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            ARR
          </text>
        </svg>
      );
    case "marketing":
      return (
        <svg {...sharedProps}>
          <defs>
            <linearGradient
              id="marketingGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.14" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path
            d="M84 42h152l-26 40H110Z"
            fill="url(#marketingGradient)"
            stroke={mid}
          />
          <path d="M108 82h104l-20 36h-64Z" fill="white" stroke={mid} />
          <path d="M128 118h64l-14 34h-36Z" fill={soft} stroke={mid} />
          <path d="M142 152h36l-8 28h-20Z" fill="white" stroke={mid} />
          <VisualLabel x={244} y={54} label="Reach" tone={accentColor} />
          <VisualLabel x={236} y={94} label="Interest" tone={accentColor} />
          <VisualLabel x={228} y={132} label="Intent" tone={accentColor} />
          <VisualLabel x={220} y={166} label="Conversion" tone={accentColor} />
        </svg>
      );
    case "finance":
      return (
        <svg {...sharedProps}>
          <rect x="52" y="38" width="216" height="144" rx="28" fill={soft} />
          {[74, 112, 150, 188, 226].map((x, index) => (
            <g key={x}>
              <rect
                x={x}
                y={150 - index * 18}
                width="22"
                height={58 + index * 18}
                rx="11"
                fill="white"
                stroke={mid}
              />
            </g>
          ))}
          <path
            d="M64 154c28-28 58-46 92-54 30-7 62-4 100 12"
            fill="none"
            stroke={line}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="224" cy="116" r="16" fill="white" stroke={mid} />
          <text
            x="224"
            y="121"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            Runway
          </text>
          <VisualLabel x={86} y={50} label="Cash" tone={accentColor} />
          <VisualLabel x={146} y={34} label="Model" tone={accentColor} />
          <VisualLabel x={230} y={54} label="Pricing" tone={accentColor} />
        </svg>
      );
    case "accounting":
      return (
        <svg {...sharedProps}>
          <circle cx="160" cy="110" r="72" fill={soft} />
          <circle
            cx="160"
            cy="110"
            r="44"
            fill="white"
            stroke={mid}
            strokeWidth="2"
          />
          <path
            d="M160 38a72 72 0 0 1 62 36"
            fill="none"
            stroke={line}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M232 110a72 72 0 0 1-34 62"
            fill="none"
            stroke={line}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M160 182a72 72 0 0 1-63-34"
            fill="none"
            stroke={line}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M88 110a72 72 0 0 1 35-62"
            fill="none"
            stroke={line}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <VisualLabel x={160} y={30} label="Capture" tone={accentColor} />
          <VisualLabel x={252} y={110} label="Reconcile" tone={accentColor} />
          <VisualLabel x={160} y={192} label="Report" tone={accentColor} />
          <VisualLabel x={68} y={110} label="Close" tone={accentColor} />
          <text
            x="160"
            y="114"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="13"
            fontWeight="700"
          >
            Reviewable Books
          </text>
        </svg>
      );
    case "operations":
      return (
        <svg {...sharedProps}>
          <rect x="52" y="88" width="216" height="44" rx="22" fill={soft} />
          {[72, 124, 176, 228].map((x, index) => (
            <g key={x}>
              <circle cx={x} cy="110" r="20" fill="white" stroke={mid} />
              <text
                x={x}
                y="114"
                textAnchor="middle"
                fill="#1d2126"
                fontSize="11"
                fontWeight="700"
              >
                {["Intake", "Route", "Deliver", "Review"][index]}
              </text>
            </g>
          ))}
          <path
            d="M92 110h12M144 110h12M196 110h12"
            stroke={line}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M98 68c18-18 42-27 72-27s54 9 72 27"
            fill="none"
            stroke={mid}
            strokeDasharray="4 8"
            strokeWidth="2.5"
          />
          <VisualLabel
            x={160}
            y={34}
            label="Automation Layer"
            tone={accentColor}
          />
        </svg>
      );
    case "leadership":
      return (
        <svg {...sharedProps}>
          <polygon
            points="160,38 224,78 224,142 160,182 96,142 96,78"
            fill={soft}
            stroke={mid}
            strokeWidth="2"
          />
          <polygon
            points="160,62 204,88 204,132 160,158 116,132 116,88"
            fill="white"
            stroke={mid}
          />
          <circle
            cx="160"
            cy="110"
            r="16"
            fill={accentColor}
            fillOpacity="0.14"
            stroke={mid}
          />
          <text
            x="160"
            y="114"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            Clarity
          </text>
          <VisualLabel x={160} y={28} label="Hiring" tone={accentColor} />
          <VisualLabel x={244} y={78} label="Delegation" tone={accentColor} />
          <VisualLabel x={244} y={144} label="Feedback" tone={accentColor} />
          <VisualLabel x={160} y={194} label="Structure" tone={accentColor} />
          <VisualLabel x={76} y={144} label="Performance" tone={accentColor} />
          <VisualLabel x={76} y={78} label="One-on-Ones" tone={accentColor} />
        </svg>
      );
    case "customer-success":
      return (
        <svg {...sharedProps}>
          <path
            d="M68 158 116 126 164 100 212 76 252 60"
            fill="none"
            stroke={line}
            strokeWidth="8"
            strokeLinecap="round"
          />
          {[68, 116, 164, 212, 252].map((x, index) => (
            <g key={x}>
              <circle
                cx={x}
                cy={158 - index * 22}
                r="18"
                fill="white"
                stroke={mid}
              />
            </g>
          ))}
          <VisualLabel x={68} y={186} label="Onboard" tone={accentColor} />
          <VisualLabel x={116} y={150} label="Adopt" tone={accentColor} />
          <VisualLabel x={164} y={122} label="Health" tone={accentColor} />
          <VisualLabel x={212} y={96} label="Renew" tone={accentColor} />
          <VisualLabel x={252} y={72} label="Expand" tone={accentColor} />
        </svg>
      );
    case "data-analytics":
      return (
        <svg {...sharedProps}>
          <rect x="54" y="50" width="54" height="118" rx="24" fill={soft} />
          <rect
            x="132"
            y="70"
            width="58"
            height="78"
            rx="18"
            fill="white"
            stroke={mid}
          />
          <rect
            x="214"
            y="56"
            width="52"
            height="106"
            rx="18"
            fill={soft}
            stroke={mid}
          />
          <path
            d="M108 109h24M190 109h24"
            stroke={line}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M228 142h10M228 124h18M228 106h26M228 88h16"
            stroke={accentColor}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <text
            x="81"
            y="114"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            Events
          </text>
          <text
            x="161"
            y="114"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            Model
          </text>
          <text
            x="240"
            y="74"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            Dashboards
          </text>
        </svg>
      );
    case "ai-automation":
      return (
        <svg {...sharedProps}>
          <circle
            cx="160"
            cy="110"
            r="26"
            fill="white"
            stroke={mid}
            strokeWidth="2"
          />
          <circle cx="86" cy="74" r="20" fill={soft} stroke={mid} />
          <circle cx="236" cy="74" r="20" fill={soft} stroke={mid} />
          <circle cx="94" cy="156" r="20" fill={soft} stroke={mid} />
          <circle cx="228" cy="156" r="20" fill={soft} stroke={mid} />
          <path
            d="M106 82 140 97M214 82 180 97M108 148 142 122M212 148 178 122"
            stroke={line}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <text
            x="160"
            y="114"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="13"
            fontWeight="700"
          >
            Operator
          </text>
          <VisualLabel x={86} y={44} label="Trigger" tone={accentColor} />
          <VisualLabel x={236} y={44} label="Assist" tone={accentColor} />
          <VisualLabel x={94} y={186} label="Approve" tone={accentColor} />
          <VisualLabel x={228} y={186} label="Act" tone={accentColor} />
        </svg>
      );
    case "ai-engineering":
      return (
        <svg {...sharedProps}>
          <rect x="52" y="42" width="216" height="136" rx="28" fill={soft} />
          <rect
            x="76"
            y="60"
            width="168"
            height="26"
            rx="13"
            fill="white"
            stroke={mid}
          />
          <rect
            x="88"
            y="96"
            width="144"
            height="22"
            rx="11"
            fill={withAlpha(accentColor, 0.08)}
            stroke={mid}
          />
          <rect
            x="100"
            y="128"
            width="120"
            height="18"
            rx="9"
            fill="white"
            stroke={mid}
          />
          <path
            d="M112 160h96"
            stroke={line}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <VisualLabel x={240} y={64} label="Product" tone={accentColor} />
          <VisualLabel x={240} y={100} label="Evals" tone={accentColor} />
          <VisualLabel x={240} y={134} label="Platform" tone={accentColor} />
          <text
            x="160"
            y="77"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            LLM Systems
          </text>
          <text
            x="160"
            y="111"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            Retrieval + Agents
          </text>
          <text
            x="160"
            y="141"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="11"
            fontWeight="700"
          >
            Deployment Rails
          </text>
        </svg>
      );
    case "capital":
      return (
        <svg {...sharedProps}>
          <path d="M76 46h168l-26 34H102Z" fill={soft} stroke={mid} />
          <path d="M98 80h124l-20 30h-84Z" fill="white" stroke={mid} />
          <path d="M118 110h84l-14 30h-56Z" fill={soft} stroke={mid} />
          <path d="M136 140h48l-8 26h-32Z" fill="white" stroke={mid} />
          <VisualLabel x={252} y={58} label="Narrative" tone={accentColor} />
          <VisualLabel x={244} y={92} label="Targets" tone={accentColor} />
          <VisualLabel x={236} y={122} label="Diligence" tone={accentColor} />
          <VisualLabel x={228} y={154} label="Terms" tone={accentColor} />
          <circle
            cx="160"
            cy="178"
            r="18"
            fill={withAlpha(accentColor, 0.12)}
            stroke={mid}
          />
          <text
            x="160"
            y="183"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            Deploy
          </text>
        </svg>
      );
    case "legal":
      return (
        <svg {...sharedProps}>
          <path
            d="M160 42 230 66v52c0 38-30 67-70 82-40-15-70-44-70-82V66Z"
            fill={soft}
            stroke={mid}
            strokeWidth="2"
          />
          <path
            d="M160 70 206 86v34c0 25-18 45-46 57-28-12-46-32-46-57V86Z"
            fill="white"
            stroke={mid}
          />
          <path
            d="M160 94v48"
            stroke={line}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M136 118h48"
            stroke={line}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <VisualLabel x={80} y={74} label="Contracts" tone={accentColor} />
          <VisualLabel x={80} y={146} label="Privacy" tone={accentColor} />
          <VisualLabel x={242} y={74} label="Employment" tone={accentColor} />
          <VisualLabel x={242} y={146} label="Vendors" tone={accentColor} />
        </svg>
      );
    case "founder-performance":
      return (
        <svg {...sharedProps}>
          <circle cx="160" cy="110" r="74" fill={soft} />
          <circle cx="160" cy="110" r="56" fill="white" stroke={mid} />
          <circle
            cx="160"
            cy="110"
            r="34"
            fill={withAlpha(accentColor, 0.12)}
            stroke={mid}
          />
          <path
            d="M160 36v26M234 110h-26M160 184v-26M86 110h26"
            stroke={line}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <VisualLabel x={160} y={28} label="Energy" tone={accentColor} />
          <VisualLabel x={252} y={110} label="Time" tone={accentColor} />
          <VisualLabel x={160} y={194} label="Resilience" tone={accentColor} />
          <VisualLabel x={68} y={110} label="Decisions" tone={accentColor} />
          <text
            x="160"
            y="114"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="12"
            fontWeight="700"
          >
            Usefulness
          </text>
        </svg>
      );
  }
}

interface SubjectFlowVisualProps {
  accentColor: string;
  steps: SubjectHomeEcosystemStep[];
}

export function SubjectFlowVisual({
  accentColor,
  steps,
}: SubjectFlowVisualProps) {
  const soft = withAlpha(accentColor, 0.14);
  const mid = withAlpha(accentColor, 0.26);
  const line = withAlpha(accentColor, 0.56);
  const positions = steps.map((_, index) => ({
    x: 42 + index * 47,
    y: index % 2 === 0 ? 76 : 142,
  }));

  return (
    <svg
      role="img"
      viewBox="0 0 320 220"
      className="h-full w-full"
      aria-label="academy ecosystem flow"
    >
      <defs>
        <linearGradient id="ecosystemLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.62" />
        </linearGradient>
      </defs>
      <path
        d={positions
          .map(
            (point, index) =>
              `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
          )
          .join(" ")}
        fill="none"
        stroke="url(#ecosystemLine)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {positions.map((point, index) => (
        <g key={steps[index].step}>
          <circle
            cx={point.x}
            cy={point.y}
            r="26"
            fill="white"
            stroke={mid}
            strokeWidth="2"
          />
          <circle cx={point.x} cy={point.y} r="9" fill={soft} stroke={mid} />
          <text
            x={point.x}
            y={point.y + 46}
            textAnchor="middle"
            fill="#1d2126"
            fontSize="11"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {steps[index].step}
          </text>
          <text
            x={point.x}
            y={point.y + 60}
            textAnchor="middle"
            fill="rgba(29,33,38,0.68)"
            fontSize="9.5"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {steps[index].description.slice(0, 18)}
          </text>
        </g>
      ))}
      <rect
        x="24"
        y="24"
        width="272"
        height="172"
        rx="28"
        fill="none"
        stroke={mid}
        strokeDasharray="5 8"
      />
    </svg>
  );
}
