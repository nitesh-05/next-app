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
function ProductDetails({ params }: { params: { productId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.productId}`, {
          headers: {
            Accept: "application/json",
            method: "GET",
          },
        });
        if (response) {
          const data = await response.json();
          setProductData(data.product);
          setLoading(false);
        }
      } catch (error) {
        console.log("error");
      } finally {
        console.log("finally called");
      }
    };
    fetchProductById();
  }, []);
  {
    console.log("productData", productData);
  }
  return (
    <div>
      My Post: {params.productId}
      <p></p>
      {loading && <div>Loading....</div>}
      <main className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <div onClick={() => router.push(`/products`)}>Go back</div>

        {productData.map((product) => (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-7xl lg:gap-x-20 lg:grid-cols-2">
            <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
              <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">
                {product.product_name}
              </h1>
              <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">
                Entire house
              </p>
            </div>
            <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
              <Image
                src={product.image}
                alt={product.id}
                width={200}
                height={200}
                className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full"
              />
              <Image
                src={product.image1}
                alt={product.id}
                width={200}
                height={200}
                loading="lazy"
                className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32"
              />
              <Image
                src={product.image2}
                alt={product.id}
                width={200}
                height={200}
                loading="lazy"
                className="hidden w-full h-52 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32"
              />
            </div>
            <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
              <dt className="sr-only">Reviews</dt>
              <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true"
                  className="mr-1 stroke-current dark:stroke-indigo-500"
                >
                  <path
                    d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>
                  4.89 <span className="text-slate-400 font-normal">(128)</span>
                </span>
              </dd>
              <dt className="sr-only">Location</dt>
              <dd className="flex items-center">
                <svg
                  width="2"
                  height="2"
                  aria-hidden="true"
                  fill="currentColor"
                  className="mx-3 text-slate-300"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mr-1 text-slate-400 dark:text-slate-500"
                  aria-hidden="true"
                >
                  <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                  <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                </svg>
                Collingwood, Ontario
              </dd>
            </dl>
            <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
              <button
                type="button"
                className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
              >
                Check availability
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
              This sunny and spacious room is for those traveling light and
              looking for a comfy and cosy place to lay their head for a night
              or two. This beach house sits in a vibrant neighborhood littered
              with cafes, pubs, restaurants and supermarkets and is close to all
              the major attractions such as Edinburgh Castle and Arthur's Seat.
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default ProductDetails;
