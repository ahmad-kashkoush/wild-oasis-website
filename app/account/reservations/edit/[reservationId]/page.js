import FormButton from "@/app/_components/FormButton";
import { updateReservationAction } from "@/app/_lib/action";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

// static for now
export default async function Page({ params }) {
    // CHANGE
    const reservationId = params.reservationId;
    const reservation = await getBooking(reservationId);
    const cabin = await getCabin(reservation.cabinId);
    const { numGuests, maxCapacity, observations } = { ...cabin, ...reservation }
    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Edit Reservation #{reservationId}
            </h2>

            <form
                action={updateReservationAction}
                className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
                <input hidden name="reservationId" value={reservationId} />
                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        name="numGuests"
                        id="numGuests"
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                        required
                    >
                        <option value="" key="">
                            Select number of guests...
                        </option>
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                            <option selected={numGuests === x} value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        defaultValue={observations}
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                    />
                </div>

                <div className="flex justify-end items-center gap-6">
                    <FormButton text="Update reservation"/>
                </div>
            </form>
        </div>
    );
}
