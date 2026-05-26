/** Scroll card into view and force blooms visible before html-to-image runs. */
export function prepareGiftCardForCapture(node: HTMLElement): () => void {
  node.scrollIntoView({ block: "center", inline: "nearest" });

  const restored: { el: HTMLElement; opacity: string }[] = [];

  node.querySelectorAll<HTMLElement>("*").forEach((el) => {
    const opacity = Number.parseFloat(getComputedStyle(el).opacity);
    if (opacity < 0.99) {
      restored.push({ el, opacity: el.style.opacity });
      el.style.opacity = "1";
    }
  });

  return () => {
    for (const { el, opacity } of restored) {
      el.style.opacity = opacity;
    }
  };
}
