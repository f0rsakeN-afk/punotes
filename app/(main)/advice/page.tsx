import { Metadata } from "next";
import AdviceClient from "./advice-client";

export const metadata: Metadata = {
  title: "Before You Continue",
  description: "A quick reality check for Computer Engineering students who want to build a real career.",
  robots: { index: false },
};

export default function AdvicePage() {
  return <AdviceClient />;
}
