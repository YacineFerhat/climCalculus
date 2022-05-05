import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

import { Label } from '../label'
import { ResultCalcul } from '../result'

interface Props {
  handleTotal: any
  random: number
}

export const DeltaTemperature = ({ handleTotal, random }: Props) => {
  const formik = useFormik({
    initialValues: {
      plus: 0,
      moins: 0,
    },
    onSubmit: async () => {},
  })
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const handleOpen = (idx: number) => {
    if (idx !== index && !open) {
      setOpen(true)
      setIndex(idx)
    }
    if (idx === index && open) {
      setOpen(false)
    }
    if (idx !== index && open) {
      setIndex(idx)
    }
    if (idx === index && !open) {
      setOpen(true)
    }
  }
  useEffect(() => {
    handleTotal(formik.values.plus - formik.values.moins)
  }, [formik.values])

  useEffect(() => {
    formik.resetForm()
  }, [random])

  const inputClass =
    'appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => handleOpen(0)}
      >
        <label
          className="text-md mb-2 block cursor-pointer font-bold uppercase tracking-wide text-gray-700"
          htmlFor="grid-first-name"
        >
          Delta thermique
        </label>
        {index === 0 && open ? (
          <FaAngleUp className="cursor-pointer" />
        ) : (
          <FaAngleDown className="cursor-pointer" />
        )}
      </div>
      {open && index === 0 && (
        <div className="transition delay-150 ease-in-out">
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
              <Label title="Température extérieure" />
              <input
                className={inputClass}
                onChange={formik.handleChange}
                id="moins"
                type="number"
                placeholder="0"
                name="moins"
                value={formik.values.moins}
              />
            </div>
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
              <Label title="Température ambiante" />
              <input
                className={inputClass}
                onChange={formik.handleChange}
                id="plus"
                type="number"
                placeholder="0"
                name="plus"
                value={formik.values.plus}
              />
            </div>
          </div>
          <div>
            <Label title="Delta (C°)" />
            <ResultCalcul result={formik.values.plus - formik.values.moins} />
          </div>
        </div>
      )}
      <div className="my-4 h-0.5 w-full bg-gray-100" />
    </div>
  )
}
