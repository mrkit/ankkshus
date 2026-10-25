import {
  DRAGON_MARK,
  FROST_DRAKE,
  HATCHLING,
  LUNG_DRAGON,
  paintAttrs,
  RED_DRAGON,
  SEA_SERPENT,
  WYVERN,
} from './shapes.js';

// Every piece is drawn facing right; facing="left" mirrors the root group.
function Piece({
  parts,
  name,
  box,
  size = 48,
  color = 'currentColor',
  facing = 'right',
  title = name,
  ...props
}) {
  const flip =
    facing === 'left' ? `translate(${box} 0) scale(-1 1)` : undefined;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${box} ${box}`}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <g transform={flip}>
        {parts.map((part) => (
          <path key={part.d} d={part.d} {...paintAttrs(part, color)} />
        ))}
      </g>
    </svg>
  );
}

export function RedDragon(props) {
  return <Piece parts={RED_DRAGON} name="Red dragon" box={64} {...props} />;
}

export function SeaSerpent(props) {
  return <Piece parts={SEA_SERPENT} name="Sea serpent" box={64} {...props} />;
}

export function Wyvern(props) {
  return <Piece parts={WYVERN} name="Wyvern" box={64} {...props} />;
}

export function LungDragon(props) {
  return <Piece parts={LUNG_DRAGON} name="Lung dragon" box={64} {...props} />;
}

export function FrostDrake(props) {
  return <Piece parts={FROST_DRAKE} name="Frost drake" box={64} {...props} />;
}

export function Hatchling(props) {
  return <Piece parts={HATCHLING} name="Hatchling" box={64} {...props} />;
}

export function DragonMark(props) {
  return (
    <Piece parts={DRAGON_MARK} name="Dragon" box={32} size={32} {...props} />
  );
}

export const DRAGONS = [
  { id: 'red-dragon', name: 'Red dragon', Component: RedDragon },
  { id: 'sea-serpent', name: 'Sea serpent', Component: SeaSerpent },
  { id: 'wyvern', name: 'Wyvern', Component: Wyvern },
  { id: 'lung-dragon', name: 'Lung dragon', Component: LungDragon },
  { id: 'frost-drake', name: 'Frost drake', Component: FrostDrake },
  { id: 'hatchling', name: 'Hatchling', Component: Hatchling },
];
