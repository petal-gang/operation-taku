export type Wrap = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export const wraps: Wrap[] = [
  {
    id: "pink",
    name: "Blush Pink",
    image: "/wraps/triangle_pink.png",
    description: "Hand-tied pink paper cone",
  },
  {
    id: "beige",
    name: "Warm Kraft",
    image: "/wraps/triangle_beige.png",
    description: "Classic kraft cone wrap",
  },
  {
    id: "blush",
    name: "Rose Cream",
    image: "/wraps/triangle_blush.png",
    description: "Cream paper with pink ribbon",
  },
  {
    id: "sage",
    name: "Sage Garden",
    image: "/wraps/triangle_sage.png",
    description: "Muted green botanical wrap",
  },
];

export const DEFAULT_WRAP_ID = "pink";

export function getWrapById(id: string): Wrap | undefined {
  return wraps.find((w) => w.id === id);
}
