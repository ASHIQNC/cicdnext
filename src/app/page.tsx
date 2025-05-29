import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
// import Image from 'next/image';

export default function Home() {
  // const SORT_OPTIONS = [
  //   { name: 'None', value: 'none' },
  //   { name: 'Price: Low to High', value: 'price-asc' },
  //   { name: 'Price: High to Low', value: 'price-desc' },
  // ] as const;
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b  border-gray-200pb-6 pt-24">
        {/* tracking-tight:letter spacing */}
        <h1 className=" text-4xl font-bold tracking-tight text-gray-900">
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </main>
  );
}
