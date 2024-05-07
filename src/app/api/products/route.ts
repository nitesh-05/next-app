import { NextResponse } from "next/server";
import products from "../products.json";

export async function GET() {
  // const response = await fetch("https://dummyjson.com/products");

  // if (response) {
  //   return NextResponse.json({
  //     response,
  //   });
  // }

  return NextResponse.json({
    products,
  });
}

// export async function POST(req: Request) {
//   const data = await req.json();
//   return NextResponse.json({
//     data,
//   });
// }

// export async function PATCH() {
//   return NextResponse.json({
//     products: [
//       {
//         id: 1,
//         name: "Strawberries",
//       },
//     ],
//   });
// }
