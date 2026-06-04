import express from "express";
import { validateExpense } from "./src/lib/validateExpense.js";

const app = express();
app.use(express.json());

// Enkelt in-memory lager — null oppsett, nullstilles ved omstart.
// (Bytt til SQLite/Supabase hvis du vil ta det videre etter workshopen.)
const store: Array<Record<string, unknown>> = [];
let nextId = 1;

app.post("/api/expenses", (req, res) => {
  const result = validateExpense(req.body);
  if (!result.ok) {
    return res.status(400).json({ errors: result.errors });
  }
  const created = { id: nextId++, ...result.value };
  store.push(created);
  return res.status(201).json(created);
});

app.get("/api/expenses", (_req, res) => {
  res.json(store);
});

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => console.log(`API kjører på http://localhost:${port}`));
