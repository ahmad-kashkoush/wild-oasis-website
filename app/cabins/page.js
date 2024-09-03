// static: uses ISR (aka. incremental static regeneration)
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";
import Spinner from "@/app/_components/Spinner";
import CabinsList from "@/app/cabins/CabinsList";
import { Suspense } from "react";

// force to be dynamic page
export const revalidate = 0;
export const metadata = {
    title: "Cabins"
}
export default function Page({ searchParams }) {
    // CHANGE
    const filter = searchParams?.capacity ?? "all";

    return (
        <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 text-lg mb-10">
                Cozy yet luxurious cabins, located right in the heart of the Italian
                Dolomites. Imagine waking up to beautiful mountain views, spending your
                days exploring the dark forests around, or just relaxing in your private
                hot tub under the stars. Enjoy nature&apos; s beauty in your own little home
                away from home. The perfect spot for a peaceful, calm vacation. Welcome
                to paradise.
            </p>
            <div className="flex justify-end mb-8">
                <Filter />
            </div>
            {/* to make suspense work on filter change, you need to add unique key */}
            <Suspense fallback={<Spinner />} key={filter}>
                <CabinsList filter={filter} />
                <ReservationReminder />
            </Suspense>

        </div>
    );
}

