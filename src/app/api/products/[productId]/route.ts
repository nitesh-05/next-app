import { NextResponse } from "next/server";

import products from "../../products.json";

export async function GET(req: Request, context: any) {
  const { params } = context;

  const product = products.filter((x) => params.productId === x.id.toString());
  return NextResponse.json({
    product,
  });
}
