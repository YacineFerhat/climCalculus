import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Animated } from 'react-animated-css';
import { Label } from '../label';
import { ResultCalcul } from '../result';
interface Props {
  title: string;
  handleTotal: any;
  name: string;
  initialKdt?: number;
  delta: number;
  random: number;
}

export const CalculPlancher = ({
  name,
  title,
  handleTotal,
  initialKdt,
  delta,
  random,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      longueur: 0,
      largeur: 0,
      quantite: 1,
      surface: 0,
      kdt: initialKdt ? initialKdt : 90,
    },
    onSubmit: async () => {},
  });
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = (idx: number) => {
    if (idx !== index && !open) {
      setOpen(true);
      setIndex(idx);
    }
    if (idx === index && open) {
      setOpen(false);
    }
    if (idx !== index && open) {
      setIndex(idx);
    }
    if (idx === index && !open) {
      setOpen(true);
    }
  };
  useEffect(() => {
    handleTotal(
      formik.values.kdt *
        formik.values.quantite *
        delta *
        (formik.values.surface !== 0
          ? formik.values.surface
          : formik.values.longueur + formik.values.largeur),
      name
    );
  }, [formik.values]);

  useEffect(() => {
    formik.resetForm();
  }, [random]);

  const inputClass =
    'appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';
  return (
    <form>
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => handleOpen(1)}
        >
          <label
            className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 cursor-pointer"
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
          <Animated
            animationIn="bounceInLeft"
            animationOut="fadeOut"
            isVisible={open}
          >
            <div className="transition ease-in-out delay-150">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label title="Longueur (m)" />
                  <input
                    className={inputClass}
                    onChange={formik.handleChange}
                    id="longueur"
                    type="number"
                    placeholder="0"
                    name="longueur"
                    value={formik.values.longueur}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label title="Largeur (m)" />
                  <input
                    className={inputClass}
                    onChange={formik.handleChange}
                    id="largeur"
                    type="number"
                    placeholder="0"
                    name="largeur"
                    value={formik.values.largeur}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <Label title="quantite" />
                  <input
                    className={inputClass}
                    onChange={formik.handleChange}
                    id="quantite"
                    type="number"
                    placeholder="0"
                    name="quantite"
                    value={formik.values.quantite}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label title="Surface (m²)" />
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="number"
                    placeholder="0"
                    onChange={formik.handleChange}
                    name="surface"
                    value={
                      formik.values.surface !== 0
                        ? formik.values.surface
                        : formik.values.longueur * formik.values.largeur
                    }
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label title="Kdt (W/M²)" />
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="number"
                    placeholder="0"
                    onChange={formik.handleChange}
                    name="kdt"
                    value={formik.values.kdt}
                  />
                </div>
              </div>
              <div>
                <Label title="Apport calorifique (WATT)" />
                <div className="flex">
                  <ResultCalcul
                    result={
                      formik.values.kdt *
                      formik.values.quantite *
                      (formik.values.surface !== 0
                        ? formik.values.surface
                        : formik.values.longueur * formik.values.largeur)
                    }
                    value="w"
                  />
                  <ResultCalcul
                    css="ml-4"
                    result={
                      (formik.values.kdt *
                        delta *
                        formik.values.quantite *
                        (formik.values.surface !== 0
                          ? formik.values.surface
                          : formik.values.longueur * formik.values.largeur)) /
                      1000
                    }
                    value="Kw"
                  />
                </div>
              </div>
            </div>
          </Animated>
        )}
        <div className="my-4 h-0.5 bg-gray-100 w-full" />
      </div>
    </form>
  );
};
