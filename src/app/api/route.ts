export function GET() {
  const response = {
    message: "Nothing to see here",
    status: "success",
  };

  const message = JSON.stringify(response, null, 2);

  return new Response(message, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
