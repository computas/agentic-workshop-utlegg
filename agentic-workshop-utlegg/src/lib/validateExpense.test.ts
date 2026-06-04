import { describe, it, expect } from "vitest";
import { validateExpense, type ExpenseInput } from "./validateExpense";

// Et gyldig utlegg vi varierer i hver test.
const valid: ExpenseInput = {
  description: "Taxi til kunde",
  amountNOK: 349.5,
  date: "2024-01-15",
  category: "travel"
};

// Disse testene ER akseptansekriteriene for backend-vertikalen.
// "Produksjonsklar" = alle grønne. Mot stubben er bare noen få grønne.
describe("validateExpense", () => {
  it("godtar et gyldig utlegg", () => {
    const r = validateExpense(valid);
    expect(r.ok).toBe(true);
    expect(r.value?.amountNOK).toBe(349.5);
  });

  it("avviser tom beskrivelse", () => {
    const r = validateExpense({ ...valid, description: "   " });
    expect(r.ok).toBe(false);
    expect(r.errors.description).toBeTruthy();
  });

  it("trimmer ledende/etterfølgende mellomrom i beskrivelse", () => {
    const r = validateExpense({ ...valid, description: "  Lunsj med kunde  " });
    expect(r.ok).toBe(true);
    expect(r.value?.description).toBe("Lunsj med kunde");
  });

  it("avviser beskrivelse over 140 tegn", () => {
    const r = validateExpense({ ...valid, description: "a".repeat(141) });
    expect(r.ok).toBe(false);
    expect(r.errors.description).toBeTruthy();
  });

  it("avviser beløp som er null eller negativt", () => {
    expect(validateExpense({ ...valid, amountNOK: 0 }).ok).toBe(false);
    expect(validateExpense({ ...valid, amountNOK: -5 }).ok).toBe(false);
  });

  it("avviser beløp som ikke er et endelig tall", () => {
    expect(validateExpense({ ...valid, amountNOK: Number.NaN }).ok).toBe(false);
    expect(validateExpense({ ...valid, amountNOK: Number.POSITIVE_INFINITY }).ok).toBe(false);
  });

  it("avviser beløp med mer enn 2 desimaler", () => {
    const r = validateExpense({ ...valid, amountNOK: 10.999 });
    expect(r.ok).toBe(false);
    expect(r.errors.amountNOK).toBeTruthy();
  });

  it("avviser dato fram i tid", () => {
    const iMorgen = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
    const r = validateExpense({ ...valid, date: iMorgen });
    expect(r.ok).toBe(false);
    expect(r.errors.date).toBeTruthy();
  });

  it("avviser ugyldig datoformat", () => {
    const r = validateExpense({ ...valid, date: "15.01.2024" });
    expect(r.ok).toBe(false);
    expect(r.errors.date).toBeTruthy();
  });

  it("avviser ukjent kategori", () => {
    const r = validateExpense({ ...valid, category: "ferie" });
    expect(r.ok).toBe(false);
    expect(r.errors.category).toBeTruthy();
  });

  it("returnerer ikke et value-objekt når valideringen feiler", () => {
    const r = validateExpense({ ...valid, amountNOK: -1 });
    expect(r.value).toBeUndefined();
  });
});
