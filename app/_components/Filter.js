"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterButtons = [
    {
        name: "all cabins",
        value: "all",
    },
    {
        name: "1-3 guests",
        value: "small",
    },
    {
        name: "4-7 guests",
        value: "medium",
    },
    {
        name: "8-12 guests",
        value: "large",
    }
]

function Filter() {
    const searchParams = useSearchParams();
    const currentFilterValue = searchParams.get("capacity") || "all";
    const router = useRouter();// for navigation
    const pathname = usePathname();// to get whole route
    function handleFilterClick(e) {
        e.preventDefault();
        const filterValue = e.target.dataset.capacity;
        if (!filterValue) return;
        const params = new URLSearchParams(searchParams)
        params.set("capacity", filterValue);

        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <div
            className="border border-primary-800 flex"
            onClick={handleFilterClick}>
            {filterButtons.map(item => (
                <button 
                key={item.value} 
                className={`${currentFilterValue === item.value ? "bg-primary-700" : ""} px-5 py-2  hover:bg-primary-700`} 
                data-capacity={item.value}>{item.name}</button>
            ))
            }
        </div>
    );
}
export default Filter;