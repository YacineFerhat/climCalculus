import { useState } from 'react'

interface Props {
  changePage: any
  pages: number[]
}
export const Pagination = ({ changePage, pages }: Props) => {
  const [index, setIndex] = useState(1)
  const handleIndex = (newIndex: number, type: string) => {
    if (index === 1 && type === 'minus') return
    if (index === 4 && type === 'plus') return
    else {
      setIndex(newIndex)
      changePage(newIndex)
    }
  }
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3  sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className='mb-2'>
          <p className="text-sm text-gray-700">
            Page actuelle :<span className="ml font-bold">{index}</span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0  flex -space-x-px rounded-md"
            aria-label="Pagination"
          >
            <div />
            <a
              onClick={() => handleIndex(index - 1, 'minus')}
              className="relative inline-flex cursor-pointer items-center rounded-l-md   border bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Précedent</span>
            </a>
            {pages.map((button, idx) => (
              <a
                onClick={() => handleIndex(button, 'number')}
                key={idx}
                aria-current="page"
                className={`relative z-10 inline-flex cursor-pointer items-center border px-4 py-2 text-sm font-medium hover:bg-gray-50 ${
                  button === index ? 'bg-indigo-50 text-indigo-600' : ''
                }`}
              >
                {' '}
                {button}{' '}
              </a>
            ))}
            <a
              onClick={() => handleIndex(index + 1, 'plus')}
              className="relative inline-flex cursor-pointer items-center rounded-r-md border  bg-white  px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Suivant</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
