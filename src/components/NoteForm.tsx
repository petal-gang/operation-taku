"use client";

import { MAX_MESSAGE_LENGTH } from "@/store/bouquetStore";
import type { NoteData } from "@/store/bouquetStore";

type NoteFormProps = {
  note: NoteData;
  onChange: (note: Partial<NoteData>) => void;
};

export function NoteForm({ note, onChange }: NoteFormProps) {
  return (
    <fieldset className="flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-warm-beige bg-white/50 p-6">
      <legend className="font-heading text-2xl font-semibold text-dark-green px-1">
        Your note
      </legend>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-dark-green/80">To</span>
        <input
          type="text"
          value={note.to}
          onChange={(e) => onChange({ to: e.target.value })}
          placeholder="Your friend's name"
          maxLength={60}
          className="min-h-[44px] rounded-lg border border-warm-beige bg-cream px-4 py-2 text-dark-green outline-none focus:border-gold focus:ring-1 focus:ring-gold"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-dark-green/80">
          Message <span className="text-gold">*</span>
        </span>
        <textarea
          value={note.message}
          onChange={(e) => onChange({ message: e.target.value })}
          placeholder="Hey! Just wanted to say..."
          rows={4}
          maxLength={MAX_MESSAGE_LENGTH}
          required
          className="min-h-[120px] resize-y rounded-lg border border-warm-beige bg-cream px-4 py-3 text-dark-green outline-none focus:border-gold focus:ring-1 focus:ring-gold"
        />
        <span className="text-right text-xs text-dark-green/60">
          {note.message.length} / {MAX_MESSAGE_LENGTH}
        </span>
      </label>
    </fieldset>
  );
}
