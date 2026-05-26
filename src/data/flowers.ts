export type Flower = {
  id: string;
  name: string;
  meaning: string;
  /** Stem PNG for bouquet center and builder preview */
  image: string;
  /** Optional bloom-only layer for density behind main stems */
  bloomImage?: string;
  /** Legacy SVG for gift-card corner/side decorations */
  decorationImage: string;
  color: string;
};

export const flowers: Flower[] = [
  {
    id: "rose_red",
    name: "Red Rose",
    meaning: "You're awesome",
    image: "/flowers/stems/rose_red.png",
    bloomImage: "/flowers/blooms/rose_red.png",
    decorationImage: "/flowers/rose_red.svg",
    color: "#c41e3a",
  },
  {
    id: "rose_white",
    name: "White Rose",
    meaning: "Fresh start energy",
    image: "/flowers/stems/rose_white.png",
    bloomImage: "/flowers/blooms/rose_white.png",
    decorationImage: "/flowers/rose_white.svg",
    color: "#f5f0e8",
  },
  {
    id: "tulip",
    name: "Tulip",
    meaning: "Good vibes only",
    image: "/flowers/stems/tulip.png",
    bloomImage: "/flowers/blooms/tulip.png",
    decorationImage: "/flowers/tulip.svg",
    color: "#e85d75",
  },
  {
    id: "sunflower",
    name: "Sunflower",
    meaning: "Ride-or-die friend",
    image: "/flowers/stems/sunflower.png",
    bloomImage: "/flowers/blooms/sunflower.png",
    decorationImage: "/flowers/sunflower.svg",
    color: "#f4b942",
  },
  {
    id: "lily",
    name: "Lily",
    meaning: "Main character energy",
    image: "/flowers/stems/lily.png",
    bloomImage: "/flowers/blooms/lily.png",
    decorationImage: "/flowers/lily.svg",
    color: "#f5e6a8",
  },
  {
    id: "lavender",
    name: "Lavender",
    meaning: "Chill friend vibes",
    image: "/flowers/stems/lavender.png",
    bloomImage: "/flowers/blooms/lavender.png",
    decorationImage: "/flowers/lavender.svg",
    color: "#9b7ebd",
  },
  {
    id: "baby_breath",
    name: "Baby's Breath",
    meaning: "Forever in the group chat",
    image: "/flowers/stems/baby_breath.png",
    bloomImage: "/flowers/blooms/baby_breath.png",
    decorationImage: "/flowers/baby_breath.svg",
    color: "#f8f5f0",
  },
  {
    id: "peony",
    name: "Peony",
    meaning: "Celebration mode",
    image: "/flowers/stems/peony.png",
    bloomImage: "/flowers/blooms/peony.png",
    decorationImage: "/flowers/peony.svg",
    color: "#f08ba8",
  },
];

export function getFlowerById(id: string): Flower | undefined {
  return flowers.find((f) => f.id === id);
}
