import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

export default async function CabinsList({ filter }) {
    // you can pass revalidate time to fetch function but I don't have it
    // so I'll use no store function: aka. component level revalidation
    noStore();
    const allCabins = await getCabins();

    let cabins = [];
    if (filter === "all")
        cabins = allCabins;
    if (filter === "small")
        cabins = allCabins.filter(cabin => cabin.maxCapacity <= 3);
    if (filter === "medium")
        cabins = allCabins.filter(cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
    if (filter === "large")
        cabins = allCabins.filter(cabin => cabin.maxCapacity >= 8);
    return (
        <>
            {cabins.length > 0 && (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
                    {cabins.map((cabin) => (
                        <CabinCard cabin={cabin} key={cabin.id} />
                    ))}
                </div>
            )}
            {cabins.length <= 0 && <h1>No cabins found</h1>}
        </>
    )
}