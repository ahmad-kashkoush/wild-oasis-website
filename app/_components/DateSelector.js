"use client"
import { useReservationContext } from "@/app/_components/ReservationContext";
import "@/app/_styles/globals.css";
import { compareAsc, differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  // CHANGE
  const { regularPrice, discount, cabinPrice } = cabin;
  const { range, setRange, resetRange } = useReservationContext();
  const displayedRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  const numNights = differenceInDays(range?.from, range?.to);
  const isBookedDate = (item) => (
    isPast(item) || bookedDates.some((x) => isSameDay(item, x))
  )


  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className=" place-self-center rdp"
        mode="range"
        onSelect={(range) => {
          setRange(cur => range);
          //   {
          //   if (cur.from !== undefined) {
          //     let [a, b] = [cur.from, range.from];
          //     if (compareAsc(a, b) === 1) [a, b] = [b, a]; // means a>b
          //     return { from: a, to: b };
          //   }
          //   if(cur.from===undefined)
          //       return {from:range.from, to:undefined};
          //   if(cur.to!== undefined)
          //   if(cur.to===undefined)

          //   if(range.to)

          // })
        }}
        selected={displayedRange}
        min={minBookingLength}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) => isBookedDate(curDate)}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px] ">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
