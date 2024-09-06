"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { supabase } from "@/app/_lib/supabase";
import { revalidatePath } from "next/cache";

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });

}

export async function signOutAction() {
    await signOut({ redirectTo: "/about" })
}

/**
 * Updates the profile of the currently signed in user.
 * @param {FormData} formData Form data containing the updated fields.
 * @returns {Promise<Object>} The updated guest object.
 * @throws {Error} If the user is not signed in, or if the national ID is invalid.
 */
export async function updateProfileAction(formData) {
    const session = await auth();
    if (!session) throw new Error("Login first");
    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error("Please provide a valid national id");
    const updatedFields = { nationalID, nationality, countryFlag };

    const { data, error } = await supabase
        .from('guests')
        .update(updatedFields)
        .eq('id', session.user.guestId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
    }
    revalidatePath("/account/profile")
    return data;
}

export async function deleteBookingAction(bookingId) {
    const session = await auth();
    if (!session) throw new Error("Login first");
    const bookings=await getBookings(session.user.guestId);
    const bookingIds=bookings.map(booking=>booking.id);

    // throw error if booking id is not allowed by the guest
    if(!bookingIds.includes(bookingId))
        throw new Error("not Allowed for you");
        
    const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }
    revalidatePath("/account/reservations")

}