import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/api/suggestions", async (c) => {
	const query = c.req.query("q");
	if (!query) {
		return c.json([]);
	}
	const response = await fetch(
		`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
			query
		)}`
	);
	const data = (await response.json()) as any;
	// data format from google: [query, [suggestion1, suggestion2, ...]]
	// we just want the suggestions array at index 1
	const suggestions = data[1] || [];
	return c.json(suggestions);
});

export default app;
