// dynamic: due to params parameter 
// can be hosted static if I pre-fetch all cabins ids which I know
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
    const { name } = await getCabin(params.cabinId);
    return {
        title: `Cabin ${name}`
    }

}
/**
 * - Generates static parameters for the [cabinId] route by fetching all cabins' ids.
 * - The result is an array of objects with a single property `cabinId` which is a string.
 * - The route is dynamic because it depends on the `cabinId` parameter.
 * - However, we know all the possible `cabinId`s, so we can **pre-fetch** them.
 * - This function is used by Next.js to generate static pages.
 */
export async function generateStaticParams() {

    const cabins = await getCabins();
    const cabinsIds = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
    return cabinsIds;
}

export default async function Page({ params }) {
    /**  data fetching: blocking waterfall
    *   compiled in 680ms
    *   time equal sum of all promises
    */
    const cabin = await getCabin(params.cabinId);
    // const settings=await getSettings();
    // const bookedDates=await getBookedDatesByCabinId(params.cabinId);


    /** ⭐ Optimization: use promise.all()
     *  compiled in 283ms (awaiting in parallel not in sequence)
     *   time equal slowest promise
     */
    // const [cabin, settings, bookedDates] = await Promise.all([getCabin(params.cabinId), getSettings(), getBookedDatesByCabinId(params.cabinId)])

    /** 🤩 Optimization: show finished when is done
     *  instead of waiting for slowest to finish, show others immedietly when they are finished
     * How? 
     *  By Isolating components with there fetch logic
     *  wrap with suspense
     */


    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />

            <div>
                <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
                    Reserve {name} today. Pay on arrival.
                </h2>
                {/* Reservation */}
                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
