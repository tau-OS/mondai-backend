import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { issueSchema, productNames } from "./types.ts";

const env = config({ safe: true });

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const body = issueSchema.safeParse(await req.json());

  if (!body.success) {
    return new Response(JSON.stringify(body.error), { status: 400 });
  }

  const data = body.data;

  await fetch(env.DISCORD_WEBHOOK_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          title: "Bug Report for " + productNames[data.product_id],
          fields: [
            {
              name: "Description",
              value: data.description,
            },
            {
              name: "Expected Behavior",
              value: data.expected,
            },
          ],
        },
      ],
    }),
  });

  return new Response(null, { status: 201 });
});
