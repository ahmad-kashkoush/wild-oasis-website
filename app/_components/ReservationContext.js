"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const useReservationContext = () => useContext(ReservationContext);
const initialState = { from: undefined, to: undefined };
function ReservationProvider({ children }) {
    const [range, setRange] = useState(initialState);
    const resetRange = () => setRange(initialState);
    return (
        <ReservationContext.Provider value={{ range, setRange, resetRange }}>{children}</ReservationContext.Provider>
    );
}
export { ReservationProvider, useReservationContext };
