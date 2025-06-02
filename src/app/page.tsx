'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
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
export default function Home() {
  const [filter, setFilter] = useState({
    sort: 'none',
  });

  console.log('filter', filter);
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b  border-gray-200pb-6 pt-24">
        {/* tracking-tight:letter spacing */}
        <h1 className="text-xl sm:text-4xl font-bold tracking-tight text-gray-900">
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
    </main>
  );
}
