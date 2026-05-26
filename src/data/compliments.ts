export const landingCompliments = [
  "Your friend is going to smile when they open this.",
  "Nothing says “thinking of you” like a chaotic pile of flowers.",
  "The best messages are the ones only your group chat would get.",
  "You're about to make someone's whole week.",
  "Flowers fade — the screenshot is forever.",
  "Friendship looks good on you.",
];

export function pickRandomCompliment(): string {
  return landingCompliments[
    Math.floor(Math.random() * landingCompliments.length)
  ]!;
}
