"use client";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-12">
        <div className="mr-4">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="text-2xl font-bold sm:inline-block">lgtm.</span>
            <span className="text-xs font-light sm:inline-block">
              Powered by
            </span>
            <Image
              width={64}
              height={32}
              src="/giphy.svg"
              alt="Giphy"
            />
          </a>
        </div>

        <Link
          className="ml-auto rounded-full p-2 m-4 z-20 bg-red-600 hover:bg-red-700 transition-colors duration-300"
          href="/favorites"
        >
          <Heart size={20} color="white" />
        </Link>
      </div>
    </header>
  );
}
