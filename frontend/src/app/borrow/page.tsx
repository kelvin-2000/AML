import {BorrowForm} from "@/app/my-components/borrow-form";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Borrow | Lib Borrow",
};
export default function BorrowPage() {
  return (
    <main className="min-h-screen  bg-[#f3e9dc]/80 ">
      <div className="container mx-auto px-4 max-w-2xl  ">
         <BorrowForm />
      </div>
    </main>
  )
}

