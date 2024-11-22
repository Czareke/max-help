import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Link href='/product' className="text-blue-600">navigate to dashboard</Link>
    </div>
  );
}
