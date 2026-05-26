export type Greenery = {
  id: string;
  name: string;
  image: string;
};

export const greenery: Greenery[] = [
  {
    id: "eucalyptus_round",
    name: "Eucalyptus",
    image: "/greenery/pngtree/eucalyptus_round.png",
  },
  {
    id: "fern_frond",
    name: "Fern",
    image: "/greenery/pngtree/fern_frond.png",
  },
  {
    id: "lily_leaf",
    name: "Lily Leaf",
    image: "/greenery/pngtree/lily_leaf.png",
  },
  {
    id: "vine_curl",
    name: "Vine",
    image: "/greenery/pngtree/vine_curl.png",
  },
  {
    id: "sage_leaf",
    name: "Sage",
    image: "/greenery/pngtree/sage_leaf.png",
  },
  {
    id: "olive_branch",
    name: "Olive Branch",
    image: "/greenery/pngtree/olive_branch.png",
  },
];

export function getGreeneryById(id: string): Greenery | undefined {
  return greenery.find((g) => g.id === id);
}
