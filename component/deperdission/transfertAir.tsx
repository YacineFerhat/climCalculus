import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

import { Label } from '../label'
import { ResultCalcul } from '../result'
interface Props {
  delta: number
  title: string
  handleTotal: any
  name: string
  random: number
}

export const TransfertAir = ({
  random,
  name,
  delta,
  title,
  handleTotal,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      correctionTemperature: 0,
      coefficientU: 0,
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
    handleTotal(
      formik.values.correctionTemperature * delta * formik.values.coefficientU,
      name
    )
  }, [formik.values])

  useEffect(() => {
    formik.resetForm()
  }, [random])

  const inputClass =
    'appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
  return (
    <form>
      <div>
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => handleOpen(1)}
        >
          <label
            className="text-md mb-2 block cursor-pointer font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-first-name"
          >
            {title}
          </label>
          {index === 1 && open ? (
            <FaAngleUp className="cursor-pointer" />
          ) : (
            <FaAngleDown className="cursor-pointer" />
          )}
        </div>
        {open && index === 1 && (
          <div className="transition delay-150 ease-in-out">
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <Label title="Coefficient U" />
                <input
                  className={inputClass}
                  onChange={formik.handleChange}
                  id="coefficientU"
                  type="number"
                  placeholder="0"
                  name="coefficientU"
                  value={formik.values.coefficientU}
                />
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <Label title="Correction température (coef)" />
                <input
                  className={inputClass}
                  onChange={formik.handleChange}
                  id="correctionTemperature"
                  type="number"
                  placeholder="0"
                  name="correctionTemperature"
                  value={formik.values.correctionTemperature}
                />
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <Label title="Correction température (C)" />
                <input
                  className="mb-3 block w-full cursor-not-allowed appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-700 focus:bg-white focus:outline-none"
                  onChange={formik.handleChange}
                  id="correctionTemperature"
                  type="number"
                  placeholder="0"
                  disabled
                  name="correctionTemperature"
                  value={formik.values.correctionTemperature * delta}
                />
              </div>
            </div>
            <div>
              <Label title="Total déperdission" />
              <ResultCalcul
                result={
                  formik.values.correctionTemperature *
                  delta *
                  formik.values.coefficientU
                }
                value="W"
              />
            </div>
          </div>
        )}
        <div className="my-4 h-0.5 w-full bg-gray-100" />
      </div>
    </form>
  )
}
