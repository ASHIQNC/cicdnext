'use client';
import ProductPage from '@/components/Products/Product';
import ProductSkeleton from '@/components/Products/ProductSkeleton';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/db';
import { cn } from '@/lib/utils';
import { ProductState } from '@/lib/validators/product-validator';
import { AccordionItem } from '@radix-ui/react-accordion';
import { useQuery } from '@tanstack/react-query';
import { QueryResult } from '@upstash/vector';
import axios from 'axios';
import { ChevronDown, Filter } from 'lucide-react';
import { useState } from 'react';
// import Image from 'next/image';

//as const = if we give this the typescript knows its an array and it will not change
//that is the value inside it will not change at any cost
//if we try to push anything inside the array it will throw error

const SORT_OPTIONS = [
  { name: 'None', value: 'none' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
] as const;

const SUBCATEGORIES = [
  { name: 'T-Shirts', selected: true, href: '#' },
  { name: 'Hoodies', selected: false, href: '#' },
  { name: 'Sweatshirts', selected: false, href: '#' },
  { name: 'Accessories', selected: false, href: '#' },
];

const COLOR_FILTERS = {
  id: 'color',
  name: 'Color',
  options: [
    { value: 'white', label: 'White' },
    { value: 'beige', label: 'Beige' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'purple', label: 'Purple' },
  ] as const,
};
const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number]; //while doing [number, number] type script always know the number can change
// it is not always the 0, 100 it will change.but the length will no change

export default function Home() {
  const [filter, setFilter] = useState<ProductState>({
    color: ['beige', 'blue', 'green', 'purple', 'white'],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    size: ['L', 'M', 'S'],
    sort: 'none',
  });

  //fetching data

  // for alternative request like "post" we can use useMutation
  // usequery for getting data
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      //  <QueryResult<Product> :here we are mention the type
      //queryresult is coming from upstash vector
      const { data } = await axios.post<QueryResult<Product>[]>(
        //this is the endpoint we are calling
        //if we deploy in production we can use that url
        //then the data will be the filter data
        'api/products',
        {
          filter: {
            sort: filter.sort,
          },
        }
      );
      return data;
    },
  });

  console.log('prod', products);
  //here we are creating a function beacuse for the color and size we are using the same logic
  // this funtion only apply for array values

  // category can be color or size
  // value can be the value like,
  //for size the value will be small , medium etc
  //for color the value will be the colors like blue ,green
  const applyArrayFilter = ({
    category,
    value,
  }: {
    // we just need to omit the price, and sort value since its not and array
    category: keyof Omit<typeof filter, 'price' | 'sort'>;
    value: string; // "s" | "M" |"greeen" ,"white"  etc
  }) => {
    //check whether the filter checked is in the array or not
    //"value as never": is used remove the typescript error

    const isFilterApplied = filter[category].includes(value as never);

    //if the value is there we should remove from the array
    //if it is not checked that is not in the array then add the value

    if (isFilterApplied) {
      setFilter((prev) => ({
        //store the previious value and change the category
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  };
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b  border-gray-200pb-6 pt-24">
        {/* tracking-tight:letter spacing */}
        <h1 className="text-xl sm:text-4xl font-bold tracking-tight text-red-900">
          High-quality cotton selection
        </h1>

        <div className="flex items-center">
          <DropdownMenu>
            {/* we have given group for the parent .athepole child iconin group hover koduthind so nammal parent hover cheythalum childin effect verum */}
            <DropdownMenuTrigger className="group inline-flex text-sm not-only:justify-center font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {SORT_OPTIONS.map((option) => {
                return (
                  // important:cn is a part of shadcn ui which will help us to add dynamic style in tailwindcss
                  //we can also install this in the tailwindcss project aswell
                  //this is a usefull library which will help us to add conditional styling in tailwind css
                  <button
                    //first class will apply unconditonally,
                    //remaining value only apply conditionally
                    className={cn('text-left w-full block px-4 py-2 text-sm ', {
                      //here you can see this this style only apply if "option value is equal to the filterd sort value"
                      //in this way we can more conditions
                      'text-gray-900 bg-gray-100': option.value === filter.sort,
                      'text-gray-500': option.value !== filter.sort,
                    })}
                    key={option.name}
                    onClick={() => {
                      setFilter((prev) => ({
                        //this state will have previous value(ie size or color) as well as we are changing the sort value as well
                        //that is keep the previous filter and only change the sort value
                        ...prev,
                        sort: option?.value,
                      }));
                    }}
                  >
                    {option.name}
                  </button>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* filters */}
          <div className="hidden lg:block">
            <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
              {SUBCATEGORIES.map((category) => (
                <li key={category.name}>
                  {/* if button is disabled state cursor will not allow to click */}
                  <button
                    // as of now we only have tshrt so everything other will be disabled
                    disabled={!category.selected}
                    className="disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>

            {/*filters  */}
            <Accordion type="multiple" className="animate-none">
              {/* color filters */}
              <AccordionItem value="color">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Color</span>
                </AccordionTrigger>

                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {COLOR_FILTERS.options.map((option, index) => (
                      <li key={option.value} className="flex items-center">
                        <input
                          onChange={() => {
                            applyArrayFilter({
                              category: 'color',
                              value: option.value,
                            });
                          }}
                          type="checkbox"
                          id={`color-${index}`}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        {/*  wwe give the id in htmlFor because we are telling html that this label belng to the input box above  */}
                        <label
                          // if namml eth egane htmlFor koduthillenkil we need to click exact the checkbox for selection
                          htmlFor={`color-${index}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* product */}

          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products && products.length === 0
              ? // Case 1: `products` exists but is an empty array
                // Show a message indicating no data is available
                'no data available'
              : products
                ? // Case 2: `products` exists and has data
                  // Render each product using the `ProductPage` component
                  products.map((product) => (
                    <ProductPage key={product.id} product={product.metadata!} />
                  ))
                : // Case 3: `products` is `undefined` or `null` (likely still loading)
                  // Show 12 skeleton loaders to indicate loading state
                  //we need to map over the new array with length of 12 and fill with null value
                  // for the first value we dont care and we only care about the index
                  new Array(12)
                    .fill(null)
                    .map((_, i) => <ProductSkeleton key={i} />)}
          </ul>
        </div>
      </section>
    </main>
  );
}
