import { NextRequest } from 'next/server'

enum Type {
  int = "int",
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const min = Number(query.get('min')) || 0;
  const max = Number(query.get('max')) || 1;
  const n = Number(query.get('n')) || 1;

  let statusCode = 500;
  let statusMessage = "Internal Server Error";

  if (min > max) {
    statusCode = 400;
    statusMessage = "Minimum value is greater than maximum value!";
  } else if (min == max) {
    statusCode = 200;
    statusMessage = String(Array(n).fill(min));
  } else {
    let retVal = [];
    const numberType = query.get('type');
    const type = Type[numberType as keyof typeof Type];
    let range = max - min;

    if(type == Type.int) {
      for(let i = 0; i < n; i++) {
        retVal.push(Math.round(min + Math.random() * range));
      }
    } else {
      for(let i = 0; i < n; i++) {
        retVal.push(min + Math.random() * range);
      }
    }

    statusCode = 200;
    statusMessage = String(retVal);
  }

  return new Response(statusMessage, {
    status: statusCode
  });
}
