import React from "react";
import ReturnForm from "@/app/my-components/return-form";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Return | Lib Borrow",
};
export default function ReturnPage() {
  return (
    <main className=" bg-[#f3e9dc]/80">
      <div className="container mx-auto px-4 max-w-2xl">
        <ReturnForm />
      </div>
    </main>
  )
}

