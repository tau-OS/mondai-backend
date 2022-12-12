import { z } from "https://deno.land/x/zod@v3.20.0/mod.ts";

export const products = z.enum([
  "helium-shell",
  "fyra-accounts",
  "fermion",
  "abacus",
  "modi",
  "enigma",
  "buds",
  "victrola",
  "nixie",
]);

export const issueSchema = z.object({
  product_id: products,
  description: z.string(),
  expected: z.string(),
});

export const productNames: Record<z.infer<typeof products>, string> = {
  "helium-shell": "Helium Shell",
  "fyra-accounts": "Fyra Accounts",
  fermion: "Fermion",
  abacus: "Abacus",
  modi: "Modi",
  enigma: "Enigma",
  buds: "Buds",
  victrola: "Victrola",
  nixie: "Nixie",
};
