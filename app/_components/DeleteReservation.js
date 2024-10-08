"use client";
import SpinnerMini from '@/app/_components/SpinnerMini';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete(e) {
    if (confirm("Are you sure you want to delete this reservation?"));
    startTransition(() => onDelete(bookingId))
  }
  return (
    //  can call server actions on client components
    <button onClick={handleDelete} className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'>
      {!isPending ? <span className='flex gap-2 items-center justify-center text-[.75rem]'>
        <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
        <span className='mt-1'>Del</span>
      </span> :
        <span className='mx-auto'><SpinnerMini /></span>
      }
    </button>
  );
}

export default DeleteReservation;
