// Create own server with one endpoint a single get
// 200 returns a access token with other fields
// >300 returns an error json object


const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/endpoint") {
      const flag = url.searchParams.get('flag')
      if (flag === 'true') {
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" // from JWT.io, no private info here.
        return Response.json({ access_token: jwt, tokyo: "drift" }, { status: 200 })
      }
      return Response.json({ error: "error", error_description: "some desc" }, { status: 400 })
    }
    return new Response("Page not found!", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);
