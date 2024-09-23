import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import LandingPage from "./Landing/page";

export default function Home() {
  return (
    <div>
      <Header/>
      <LandingPage/>
    </div>
  );
}
