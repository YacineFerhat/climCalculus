import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Animated } from 'react-animated-css';
import { Label } from '../label';
import { ResultCalcul } from '../result';
interface Props {
  delta: number;
  title: string;
  handleTotal: any;
  name: string;
  random: number;
}

export const CalculSpecial = ({
  random,
  name,
  delta,
  title,
  handleTotal,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      imputat: 0,
      correctionTemperature: 0,
      coefficientU: 0,
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
      formik.values.correctionTemperature *
        formik.values.imputat *
        delta *
        formik.values.coefficientU,
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
                  <Label title="Superficie des joints impérméables" />
                  <input
                    className={inputClass}
                    onChange={formik.handleChange}
                    id="imputat"
                    type="number"
                    placeholder="0"
                    name="imputat"
                    value={formik.values.imputat}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <Label title="Correction température (C)" />
                  <input
                    className="appearance-none cursor-not-allowed block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
                    formik.values.imputat *
                    delta *
                    formik.values.coefficientU
                  }
                  value="W"
                />
              </div>
            </div>
          </Animated>
        )}
        <div className="my-4 h-0.5 bg-gray-100 w-full" />
      </div>
    </form>
  );
};
