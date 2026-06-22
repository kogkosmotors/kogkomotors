export function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Page unavailable</title>
    <style>
      :root { color-scheme: dark; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #09090b;
        color: #fafafa;
      }
      main { max-width: 420px; text-align: center; }
      h1 { margin: 0 0 12px; font-size: 24px; line-height: 1.2; }
      p { margin: 0 0 24px; color: #a1a1aa; line-height: 1.6; }
      nav { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
      a, button {
        border: 1px solid #3f3f46;
        border-radius: 6px;
        padding: 10px 14px;
        background: #18181b;
        color: #fafafa;
        font: inherit;
        text-decoration: none;
        cursor: pointer;
      }
      a:first-child { background: #fafafa; color: #09090b; border-color: #fafafa; }
    </style>
  </head>
  <body>
    <main>
      <h1>This page didn't load</h1>
      <p>Something went wrong while loading the site. Please refresh or return home.</p>
      <nav>
        <a href="/">Go home</a>
        <button onclick="location.reload()">Refresh</button>
      </nav>
    </main>
  </body>
</html>`;
}