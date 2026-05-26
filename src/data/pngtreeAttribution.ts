export type PngtreeAsset = {
  id: string;
  label: string;
  /** Replace with PNGTree download URL after licensing */
  sourceUrl: string;
};

/**
 * Bouquet stem and leaf PNGs in public/flowers/stems and public/greenery/pngtree.
 * Free PNGTree assets require attribution: https://pngtree.com/legal/terms
 */
export const pngtreeAssets: PngtreeAsset[] = [
  { id: "rose_red", label: "Red rose stem", sourceUrl: "https://pngtree.com/so/flower-stem" },
  { id: "rose_white", label: "White rose stem", sourceUrl: "https://pngtree.com/so/flower-stem" },
  { id: "tulip", label: "Tulip stem", sourceUrl: "https://pngtree.com/so/flower-stem" },
  { id: "sunflower", label: "Sunflower stem", sourceUrl: "https://pngtree.com/so/flower-stem" },
  { id: "lily", label: "Lily stem", sourceUrl: "https://pngtree.com/so/flower-stem" },
  { id: "lavender", label: "Lavender sprig", sourceUrl: "https://pngtree.com/so/flower-stem" },
  { id: "baby_breath", label: "Baby's breath stem", sourceUrl: "https://pngtree.com/so/flower-stem" },
  { id: "peony", label: "Peony stem", sourceUrl: "https://pngtree.com/so/flower-stem" },
  { id: "eucalyptus_round", label: "Eucalyptus branch", sourceUrl: "https://pngtree.com/so/leaf" },
  { id: "fern_frond", label: "Fern frond", sourceUrl: "https://pngtree.com/so/leaf" },
  { id: "lily_leaf", label: "Lily leaf", sourceUrl: "https://pngtree.com/so/leaf" },
  { id: "vine_curl", label: "Vine", sourceUrl: "https://pngtree.com/so/leaf" },
  { id: "sage_leaf", label: "Sage leaf", sourceUrl: "https://pngtree.com/so/leaf" },
  { id: "olive_branch", label: "Olive branch", sourceUrl: "https://pngtree.com/so/leaf" },
];

export const PNGTREE_TERMS_URL = "https://pngtree.com/legal/terms";
