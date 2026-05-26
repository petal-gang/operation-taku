import type { NoteData } from "@/store/bouquetStore";

export type BouquetSharePayload = {
  flowers: string[];
  note: NoteData;
};

function encodeNote(note: NoteData): string {
  const raw = JSON.stringify({ to: note.to, message: note.message });
  if (typeof btoa !== "undefined") {
    return btoa(unescape(encodeURIComponent(raw)));
  }
  return Buffer.from(raw, "utf-8").toString("base64");
}

function decodeNote(encoded: string): NoteData | null {
  try {
    let raw: string;
    if (typeof atob !== "undefined") {
      raw = decodeURIComponent(escape(atob(encoded)));
    } else {
      raw = Buffer.from(encoded, "base64").toString("utf-8");
    }
    const parsed = JSON.parse(raw) as NoteData;
    if (typeof parsed.message !== "string") return null;
    return {
      to: typeof parsed.to === "string" ? parsed.to : "",
      message: parsed.message,
    };
  } catch {
    return null;
  }
}

export function encodeBouquetToSearchParams(
  payload: BouquetSharePayload,
): string {
  const params = new URLSearchParams();
  if (payload.flowers.length > 0) {
    params.set("f", payload.flowers.join(","));
  }
  if (payload.note.message.trim()) {
    params.set("n", encodeNote(payload.note));
  }
  return params.toString();
}

export function decodeBouquetFromSearchParams(
  search: string,
): BouquetSharePayload | null {
  const params = new URLSearchParams(search);
  const flowersRaw = params.get("f");
  if (!flowersRaw) return null;

  const flowers = flowersRaw.split(",").filter(Boolean);
  if (flowers.length === 0) return null;

  const noteEncoded = params.get("n");
  const note = noteEncoded
    ? (decodeNote(noteEncoded) ?? { to: "", message: "" })
    : { to: "", message: "" };

  return { flowers, note };
}

export function getAppBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

export function buildShareUrl(payload: BouquetSharePayload): string {
  const base = getAppBasePath();
  if (typeof window === "undefined") return `${base}/bouquet`;
  const qs = encodeBouquetToSearchParams(payload);
  return `${window.location.origin}${base}/bouquet?${qs}`;
}
