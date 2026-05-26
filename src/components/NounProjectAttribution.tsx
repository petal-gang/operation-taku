import { attributions } from "@/data/attributions";
import { pngtreeAssets, PNGTREE_TERMS_URL } from "@/data/pngtreeAttribution";

export function NounProjectAttribution() {
  return (
    <footer className="mt-auto w-full border-t border-warm-beige/80 bg-cream/90 px-4 py-6 text-center text-sm text-dark-green/70">
      <p>
        Corner decorations from{" "}
        <a
          href="https://thenounproject.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-gold/60 underline-offset-2 hover:text-dark-green"
        >
          Noun Project
        </a>
        {" · "}
        Bouquet stems and leaves from{" "}
        <a
          href="https://pngtree.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-gold/60 underline-offset-2 hover:text-dark-green"
        >
          PNGTree
        </a>{" "}
        (
        <a
          href={PNGTREE_TERMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-warm-beige underline-offset-2 hover:text-dark-green"
        >
          license terms
        </a>
        )
      </p>
      <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
        {attributions.map((a) => (
          <li key={a.id}>
            <a
              href={a.nounProjectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-warm-beige underline-offset-2 hover:text-dark-green"
            >
              {a.iconName}
            </a>
            <span className="text-dark-green/50"> · {a.creator}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-dark-green/55">
        PNG bouquet assets:{" "}
        {pngtreeAssets
          .slice(0, 8)
          .map((a) => a.label)
          .join(", ")}
        , and foliage ({pngtreeAssets.slice(8).map((a) => a.label).join(", ")}
        ).
      </p>
    </footer>
  );
}
