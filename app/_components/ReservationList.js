"use client"
import ReservationCard from "@/app/_components/ReservationCard";
import { deleteBookingAction } from "@/app/_lib/action";
import { useOptimistic } from "react";
function ReservationList({ bookings }) {
    const [optimisticBookings, delOptimisticBookings] = useOptimistic(bookings, (curBookings, bookingId) => {
        return curBookings.filter(booking => booking.id !== bookingId);

    });

    async function handleDelete(bookingId) {
        delOptimisticBookings(bookingId);
        await deleteBookingAction(bookingId);
    }
    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard
                    onDelete={handleDelete}
                    booking={booking} key={booking.id} />
            ))}
        </ul>
    );
}
export default ReservationList;