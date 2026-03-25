async function fetchApiRoot() {
  const base = process.env.API_URL ?? "http://127.0.0.1:5000";
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/`, {
      cache: "no-store",
    });
    const text = await res.text();
    let json: unknown;
    try {
      json = JSON.parse(text) as unknown;
    } catch {
      json = { raw: text };
    }
    return { ok: res.ok, status: res.status, base, json };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      base,
      json: { error: err instanceof Error ? err.message : String(err) },
    };
  }
}

export default async function Home() {
  const result = await fetchApiRoot();

  return (
    <main>
      <h1>EthioLocal → API</h1>
      <p>
        This page loads server-side and calls your Express API at{" "}
        <code>{result.base}</code>.
      </p>
      <h2>GET /</h2>
      <pre
        style={{
          background: "#111",
          color: "#e0e0e0",
          padding: 16,
          borderRadius: 8,
          overflow: "auto",
        }}
      >
        {JSON.stringify({ ok: result.ok, status: result.status, body: result.json }, null, 2)}
      </pre>
      <p style={{ marginTop: 24, fontSize: 14, color: "#555" }}>
        Set <code>API_URL</code> in <code>web/.env.local</code> (see{" "}
        <code>.env.example</code>). Run the API with{" "}
        <code>npm run dev</code> in <code>api/</code>.
      </p>
    </main>
  );
}
