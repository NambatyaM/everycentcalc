export default function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{ width: size, height: size, background: 'var(--brand-gradient)' }}
    >
      <svg width={Math.round(size * 0.62)} height={Math.round(size * 0.62)} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="21" fill="none" stroke="#fff" strokeWidth="4.5" opacity="0.9" />
        <text
          x="32"
          y="43"
          textAnchor="middle"
          fontFamily="'Segoe UI', Arial, Helvetica, sans-serif"
          fontWeight="800"
          fontSize="30"
          fill="#ffffff"
        >
          $
        </text>
      </svg>
    </span>
  );
}