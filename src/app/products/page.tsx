"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  product_name: string;
  id: string;
  discount_price: number;
  image: string;
  image1: string;
  image2: string;
  price: number;
  quantity: number;
}

function page() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products", {
          headers: {
            Accept: "application/json",
            method: "GET",
          },
        });
        if (response) {
          const data = await response.json();
          setProductData(data.products);
          setLoading(false);
          console.log(data.products);
        }
      } catch (error) {
        console.log("error");
      } finally {
        console.log("finally called");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {loading && <div>Loading....</div>}
          {productData.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.image}
                  alt={product.id}
                  width={200}
                  height={200}
                  layout="responsive"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {/* <a href="#"> */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.product_name}
                    {/* </a> */}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Discount : {product.discount_price}%
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
