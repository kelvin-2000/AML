"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchForm() {
  return (
    <form className="mb-12 flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search media..."
          className="h-12 rounded-full bg-white/80 pl-12 pr-4 text-lg backdrop-blur-sm focus-visible:ring-[#432818]"
        />
      </div>
      <Button
        type="submit"
        className="h-12 rounded-full bg-[#432818] px-8 text-lg font-semibold text-white hover:bg-[#795C34]"
      >
        Search
      </Button>
    </form>
  )
}

