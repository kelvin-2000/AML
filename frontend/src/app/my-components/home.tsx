import React from "react";
import { SearchForm } from "@/app/my-components/search-form";
import { MediaList } from "@/app/my-components/media-list";

export function Home() {
  return (
    <main className="min-h-screen bg-[#f3e9dc]/80 p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-[#432818] mb-8 flex items-center gap-2">
          Library
        </h1>
        {/*<SearchForm />*/}
        <MediaList />
      </div>
    </main>
  );
}
