export async function GET() {
  return new Response('Hello, you have reached the teapot hotline!', {
    status: 418
  });
}
