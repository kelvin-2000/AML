import {Home} from "@/app/my-components/home";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Home | Lib Borrow",
};
export default function HomePage() {
  return <Home />
}

