import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpenseForm } from "./ExpenseForm";

// Disse testene ER akseptansekriteriene for frontend-vertikalen.
// Mot stubben er flere røde: ingen suksessmelding, ingen feilvisning,
// ingen disabled-knapp under sending, ingen klientvalidering.

function mockFetchOnce(status: number, body: unknown, delayMs = 0) {
  return vi.fn().mockImplementation(
    () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok: status >= 200 && status < 300,
              status,
              json: async () => body
            }),
          delayMs
        )
      )
  );
}

async function fyllUtGyldigSkjema(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Beskrivelse"), "Taxi til kunde");
  await user.type(screen.getByLabelText("Beløp"), "349.50");
  await user.type(screen.getByLabelText("Dato"), "2024-01-15");
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("ExpenseForm", () => {
  it("viser en suksessbekreftelse etter vellykket innsending", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", mockFetchOnce(201, { id: 1 }));
    render(<ExpenseForm />);

    await fyllUtGyldigSkjema(user);
    await user.click(screen.getByRole("button", { name: /send inn/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(/lagret|sendt|registrert/i)
    );
  });

  it("deaktiverer knappen mens innsending pågår", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", mockFetchOnce(201, { id: 1 }, 50));
    render(<ExpenseForm />);

    await fyllUtGyldigSkjema(user);
    const knapp = screen.getByRole("button", { name: /send inn/i });
    await user.click(knapp);

    expect(knapp).toBeDisabled();
  });

  it("viser en feilmelding når API-et svarer med feil", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      mockFetchOnce(400, { errors: { amountNOK: "Beløp må være positivt" } })
    );
    render(<ExpenseForm />);

    await fyllUtGyldigSkjema(user);
    await user.click(screen.getByRole("button", { name: /send inn/i }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(/beløp/i)
    );
  });

  it("sender ikke når påkrevde felt er tomme (klientvalidering)", async () => {
    const user = userEvent.setup();
    const fetchMock = mockFetchOnce(201, { id: 1 });
    vi.stubGlobal("fetch", fetchMock);
    render(<ExpenseForm />);

    await user.click(screen.getByRole("button", { name: /send inn/i }));

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
