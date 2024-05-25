import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Link href="/blog">Blog</Link>
    </main>
  );
}
