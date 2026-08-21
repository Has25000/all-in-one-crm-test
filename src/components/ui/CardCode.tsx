/**
 * A deterministic block pattern standing in for the scannable code on Sydney's
 * card. It is decorative — the real card would carry an encoded one — so it is
 * labelled as such wherever it appears.
 */
export function CardCode({ seed, size = 132 }: { seed: string; size?: number }) {
  const modules = 21;
  const cell = size / modules;

  // Cheap deterministic hash so the same seed always draws the same pattern.
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;

  const inFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x > modules - 8 && y < 7) || (x < 7 && y > modules - 8);

  const cells: { x: number; y: number }[] = [];
  let state = hash || 1;
  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      state = (state * 1664525 + 1013904223) >>> 0;
      if (inFinder(x, y)) continue;
      if ((state >>> 16) % 100 < 46) cells.push({ x, y });
    }
  }

  const finder = (fx: number, fy: number) => (
    <g key={`${fx}-${fy}`}>
      <rect x={fx * cell} y={fy * cell} width={cell * 7} height={cell * 7} rx={cell} fill="var(--asbm-black)" />
      <rect
        x={(fx + 1) * cell}
        y={(fy + 1) * cell}
        width={cell * 5}
        height={cell * 5}
        rx={cell * 0.7}
        fill="var(--asbm-white)"
      />
      <rect
        x={(fx + 2) * cell}
        y={(fy + 2) * cell}
        width={cell * 3}
        height={cell * 3}
        rx={cell * 0.5}
        fill="var(--asbm-black)"
      />
    </g>
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Illustrative contact code"
      className="shrink-0"
    >
      <rect width={size} height={size} rx={10} fill="var(--asbm-white)" />
      {cells.map(({ x, y }) => (
        <rect
          key={`${x}-${y}`}
          x={x * cell + cell * 0.1}
          y={y * cell + cell * 0.1}
          width={cell * 0.8}
          height={cell * 0.8}
          rx={cell * 0.22}
          fill="var(--asbm-charcoal)"
        />
      ))}
      {finder(0, 0)}
      {finder(modules - 7, 0)}
      {finder(0, modules - 7)}
    </svg>
  );
}
