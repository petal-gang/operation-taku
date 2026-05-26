/**
 * Ensures all images inside the gift card export root are decoded before PNG capture.
 */
export async function preloadCardImages(root: HTMLElement): Promise<void> {
  const imgs = Array.from(
    root.querySelectorAll<HTMLImageElement>("img[src]"),
  );

  const failed: string[] = [];

  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          const report = () => {
            if (
              img.naturalWidth === 0 &&
              process.env.NODE_ENV === "development"
            ) {
              const src = img.getAttribute("src") ?? img.src;
              if (src && !failed.includes(src)) failed.push(src);
            }
            resolve();
          };

          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }

          img.addEventListener("load", report, { once: true });
          img.addEventListener("error", report, { once: true });
          const src = img.getAttribute("src");
          if (src && img.src !== src) {
            img.src = src;
          }
        }),
    ),
  );

  if (failed.length > 0 && process.env.NODE_ENV === "development") {
    console.warn(
      "[preloadCardImages] Missing or failed image assets:",
      failed,
    );
  }
}
