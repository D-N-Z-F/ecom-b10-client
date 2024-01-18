"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  push("/products");
  return null;
}
