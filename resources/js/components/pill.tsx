import { ChangeEvent } from 'react'

interface Props {
  nombre: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Pill({ nombre, checked, onChange }: Props) {
  return (
    <li className='flex items-center justify-center'>
      <div className='h-full w-full'>
        <label className='has-checked:text-amarillo relative grid h-full cursor-pointer grid-cols-[max-content_1fr] items-center gap-2 rounded-full border px-2 py-1 transition-colors'>
          <input
            checked={checked}
            type='checkbox'
            className='peer checked:border-amarillo h-5 w-5 cursor-pointer appearance-none rounded border shadow transition-all hover:shadow-md'
            onChange={onChange}
          />
          <span className='pointer-events-none absolute left-2 size-5 transform opacity-0 transition-opacity peer-checked:opacity-100'>
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </span>
          <span className='[&::-webkit-scrollbar-track]:bg-negro overflow-auto text-nowrap decoration-1 underline-offset-2 peer-checked:underline [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full'>
            {nombre}
          </span>
        </label>
      </div>
    </li>
  )
}
