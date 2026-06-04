// =============================================================================
//  REFERANSEFEATURE (ferdig).
//  Dette er mønsteret nye features skal følge: ren, delt valideringsmodul som
//  både API-et og frontend kan bruke. Se CLAUDE.md for konvensjonene og
//  .claude/skills/feature-slice for hvordan en feature bygges her.
// =============================================================================

export const CATEGORIES = ["travel", "food", "equipment", "other"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface ExpenseInput {
  description: string;
  amountNOK: number;
  date: string; // forventet format: YYYY-MM-DD
  category: string;
}

export interface CleanExpense {
  description: string;
  amountNOK: number;
  date: string;
  category: Category;
}

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
  value?: CleanExpense;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function hasMaxTwoDecimals(n: number): boolean {
  const cents = Math.round(n * 100);
  return Math.abs(cents - n * 100) < 1e-9;
}

export function validateExpense(input: ExpenseInput): ValidationResult {
  const errors: Record<string, string> = {};

  const description = (input.description ?? "").trim();
  if (description.length === 0) {
    errors.description = "Beskrivelse er påkrevd.";
  } else if (description.length > 140) {
    errors.description = "Beskrivelse kan ikke være over 140 tegn.";
  }

  const amount = input.amountNOK;
  if (!Number.isFinite(amount)) {
    errors.amountNOK = "Beløp må være et tall.";
  } else if (amount <= 0) {
    errors.amountNOK = "Beløp må være et positivt tall.";
  } else if (!hasMaxTwoDecimals(amount)) {
    errors.amountNOK = "Beløp kan ikke ha mer enn 2 desimaler.";
  }

  const date = input.date ?? "";
  const today = new Date().toISOString().slice(0, 10);
  if (!DATE_RE.test(date) || Number.isNaN(new Date(date).getTime())) {
    errors.date = "Dato må være på formatet YYYY-MM-DD.";
  } else if (date > today) {
    errors.date = "Dato kan ikke være fram i tid.";
  }

  if (!CATEGORIES.includes(input.category as Category)) {
    errors.category = "Ukjent kategori.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors: {},
    value: {
      description,
      amountNOK: amount,
      date,
      category: input.category as Category
    }
  };
}
