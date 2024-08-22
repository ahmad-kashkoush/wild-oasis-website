import Counter from "@/app/_components/Counter";
import Navigation from "@/app/_components/Navigation";
import Link from "next/link";

function Page() {
  return (
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />
  );
}
export default Page;