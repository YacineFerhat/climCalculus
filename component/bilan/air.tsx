import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { Label } from '../label'
import { ResultCalcul } from '../result'
interface Props {
  title: string
  handleTotal: any
  name: string
  delta: number
  handleForm: any
  random: number
}

export const Air = ({
  name,
  title,
  handleTotal,
  delta,
  handleForm,
  random,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      valeur: 0,
      qte: 0,
      volume: 1,
      massique: 0,
      bilanSensible: 0,
      bilanLatant: 0,
      humidite: 2.81,
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
    handleForm(formik.values)
    handleTotal(
      (formik.values.volume !== 1
        ? formik.values.volume * 1.15 * formik.values.humidite
        : formik.values.qte *
          formik.values.valeur *
          1.15 *
          formik.values.humidite *
          0.68) +
        (formik.values.volume !== 1
          ? formik.values.volume * 1.15 * delta
          : formik.values.qte * formik.values.valeur * 1.15 * delta * 0.284),
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
            <p className="mb-4 font-thin text-red-400">
              Afin d'avoir des r??sultats coh??rents, le Delta thermique doit ??tre
              remplis
            </p>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <Label title="Valeur de chaque unit??" />
                <input
                  className={inputClass}
                  onChange={formik.handleChange}
                  id="valeur"
                  type="number"
                  placeholder="0"
                  name="valeur"
                  value={formik.values.valeur}
                />
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <Label title="Quantit??" />
                <input
                  className={inputClass}
                  onChange={formik.handleChange}
                  id="qte"
                  type="number"
                  placeholder="0"
                  name="qte"
                  value={formik.values.qte}
                />
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <Label title="Volume M^3/h" />
                <input
                  className={inputClass}
                  onChange={formik.handleChange}
                  id="volume"
                  type="number"
                  placeholder="0"
                  name="volume"
                  value={
                    formik.values.volume !== 1
                      ? formik.values.volume
                      : formik.values.qte * formik.values.valeur
                  }
                />
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <Label title="Massique" />
                <input
                  className={`${inputClass} cursor-not-allowed`}
                  onChange={formik.handleChange}
                  id="massique"
                  type="number"
                  placeholder="0"
                  name="massique"
                  value={
                    formik.values.volume !== 1
                      ? formik.values.volume * 1.15
                      : formik.values.qte * formik.values.valeur * 1.15
                  }
                  disabled
                />
              </div>
            </div>
            <div>
              <Label title="Bilan thermique sensible (WATT)" />
              <div className="flex">
                <ResultCalcul
                  result={
                    formik.values.volume !== 1
                      ? formik.values.volume * 1.15 * delta
                      : formik.values.qte *
                        formik.values.valeur *
                        1.15 *
                        delta *
                        0.284
                  }
                  value="w"
                />
                <ResultCalcul
                  css="ml-4"
                  result={
                    formik.values.volume !== 1
                      ? formik.values.volume * 1.15 * delta
                      : (formik.values.qte *
                          formik.values.valeur *
                          1.15 *
                          delta *
                          0.284) /
                        1000
                  }
                  value="Kw"
                />
              </div>
              <Label title="Bilan thermique latant (WATT)" />
              <div className="flex">
                <ResultCalcul
                  result={
                    formik.values.volume !== 1
                      ? formik.values.volume * 1.15 * formik.values.humidite
                      : formik.values.qte *
                        formik.values.valeur *
                        1.15 *
                        formik.values.humidite *
                        0.68
                  }
                  value="w"
                />
                <ResultCalcul
                  css="ml-4"
                  result={
                    formik.values.volume !== 1
                      ? formik.values.volume * 1.15 * formik.values.humidite
                      : (formik.values.qte *
                          formik.values.valeur *
                          1.15 *
                          formik.values.humidite *
                          0.68) /
                        1000
                  }
                  value="Kw"
                />
              </div>
              <Label title="Apport calorifique (WATT)" />
              <div className="flex">
                <ResultCalcul
                  result={
                    (formik.values.volume !== 1
                      ? formik.values.volume * 1.15 * formik.values.humidite
                      : formik.values.qte *
                        formik.values.valeur *
                        1.15 *
                        formik.values.humidite *
                        0.68) +
                    (formik.values.volume !== 1
                      ? formik.values.volume * 1.15 * delta
                      : formik.values.qte *
                        formik.values.valeur *
                        1.15 *
                        delta *
                        0.284)
                  }
                  value="w"
                />
                <ResultCalcul
                  css="ml-4"
                  result={
                    ((formik.values.volume !== 1
                      ? formik.values.volume * 1.15 * formik.values.humidite
                      : formik.values.qte *
                        formik.values.valeur *
                        1.15 *
                        formik.values.humidite *
                        0.68) +
                      (formik.values.volume !== 1
                        ? formik.values.volume * 1.15 * delta
                        : formik.values.qte *
                          formik.values.valeur *
                          1.15 *
                          delta *
                          0.284)) /
                    1000
                  }
                  value="Kw"
                />
              </div>
            </div>
          </div>
        )}
        <div className="my-4 h-0.5 w-full bg-gray-100" />
      </div>
    </form>
  )
}
