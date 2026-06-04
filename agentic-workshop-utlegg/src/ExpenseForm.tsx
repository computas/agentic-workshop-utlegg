import { useState } from "react";
import { CATEGORIES } from "./lib/validateExpense";

// =============================================================================
//  REFERANSEFEATURE (ferdig).
//  Mønsteret for frontend: loading-state, feilvisning (role="alert"),
//  suksessbekreftelse (role="status"), og klientvalidering før innsending.
//  Nye features skal følge samme mønster — se CLAUDE.md.
// =============================================================================

const LABELS: Record<string, string> = {
  travel: "Reise",
  food: "Mat",
  equipment: "Utstyr",
  other: "Annet"
};

export function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<string>("travel");

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);

  function reset() {
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("travel");
  }

  async function handleSubmit() {
    setSuccess(null);

    const clientErrors: Record<string, string> = {};
    if (description.trim() === "") clientErrors.description = "Beskrivelse er påkrevd.";
    if (amount.trim() === "") clientErrors.amountNOK = "Beløp er påkrevd.";
    if (date === "") clientErrors.date = "Dato er påkrevd.";
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          amountNOK: Number(amount),
          date,
          category
        })
      });
      if (res.ok) {
        setSuccess("Utlegg lagret.");
        reset();
      } else {
        const body = await res.json();
        setFieldErrors(body.errors ?? { _: "Innsending feilet." });
      }
    } catch {
      setFieldErrors({ _: "Noe gikk galt. Prøv igjen." });
    } finally {
      setSubmitting(false);
    }
  }

  const errorMessages = Object.values(fieldErrors);

  return (
    <div>
      <h1>Nytt utlegg</h1>

      {success && <p role="status">{success}</p>}

      {errorMessages.length > 0 && (
        <div role="alert">
          {errorMessages.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>
      )}

      <label>
        Beskrivelse
        <input
          aria-label="Beskrivelse"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Beløp (NOK)
        <input
          aria-label="Beløp"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <label>
        Dato
        <input
          aria-label="Dato"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label>
        Kategori
        <select
          aria-label="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {LABELS[c]}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Sender…" : "Send inn"}
      </button>
    </div>
  );
}
