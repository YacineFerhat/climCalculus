import { Paper } from '../../component/paper'
import { Label } from '../../component/label'
import { ResultCalcul } from '../../component/result'
import { useFormik } from 'formik'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { Animated } from 'react-animated-css'
import {
  DeperdissionNormale,
  CalculSpecial,
  CalculAir,
  Imputat,
  TransfertAir,
} from '../../component/deperdission'
import { ModalComp } from '../../component/bilan'
import { Stepper, Pagination, Modal } from '../../component'
import { DashboardContainer } from '../../component/container'

const Deperdission = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleModal = (state: boolean) => {
    setIsOpen(state)
  }

  const formik = useFormik({
    initialValues: {
      porteEntree: {
        longueur: 0,
        largeur: 0,
        hauteur: 1,
        imputat: 0,
        correctionTemperature: 0,
        coefficientU: 0,
      },
      deltaTemperature: {
        plus: 0,
        moins: 0,
      },
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
  const inputClass =
    'appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'

  const [values, setValues] = useState({
    porteEntree: 0,
    fenetre: 0,
    mur: 0,
    vitrageToiture: 0,
    toiture: 0,
    plancherHaut: 0,
    plancherHautSurLnc: 0,
    plancherBasSurVideSanitaire: 0,
    plancherBasSurLnc: 0,
    murSeparationBatiment: 0,
    refendMurPorteur: 0,
    refendDegagement: 0,
    cloissonInterieur: 0,
    klPnahcerSurTerrePleine: 0,
    klMurEnterre: 0,
    klPlancherBasEnterre: 0,
    klPlancherIntermediaireSurLnc: 0,
    klPlancherIntermediaire: 0,
    klPlancherRefend: 0,
    klChassisFenetre: 0,
    klVoletRoulant: 0,
    entreeAir: 0,
    permeabiliteVoletRoulant: 0,
    permeabiliteOuvrante: 0,
    renouvellementAir: 0,
    transfertAir: 0,
  })

  const handleTotal = (event: any, name: string) => {
    setValues((previousState) => ({
      ...previousState,
      [name]: event,
    }))
  }

  const [total, setTotal] = useState(0)
  useEffect(() => {
    const array = Object.values(values)
    const sum = array.reduce((accumulator, value) => {
      return accumulator + value
    }, 0)
    setTotal(sum)
  }, [values])

  const [page, setPage] = useState(1)
  const changePage = (event: number) => {
    setPage(event)
  }
  const [random, setRandom] = useState(0)
  const handleReset = () => {
    setRandom(Math.random() * 10000)
  }
  return (
    <DashboardContainer>
      <Paper>
        <p className="text-lg font-medium">Déperdission thermique :</p>
        <p className="text-md font-light">
          Afin de calculer votre déperdission, veuillez remplir les champs
          suivants
        </p>
        <div className="my-4 h-0.5 w-full bg-gray-100" />
        <form onSubmit={formik.handleSubmit} className="mt-4 w-full ">
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
              <Animated
                animationIn="bounceInLeft"
                animationOut="fadeOut"
                isVisible={open}
              >
                <div className="transition delay-150 ease-in-out">
                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                      <Label title="Température extérieure" />
                      <input
                        className={inputClass}
                        onChange={formik.handleChange}
                        id="deltaTemperature.moins"
                        type="number"
                        placeholder="0"
                        name="deltaTemperature.moins"
                        value={formik.values.deltaTemperature.moins}
                      />
                    </div>
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                      <Label title="Température ambiante" />
                      <input
                        className={inputClass}
                        onChange={formik.handleChange}
                        id="deltaTemperature.plus"
                        type="number"
                        placeholder="0"
                        name="deltaTemperature.plus"
                        value={formik.values.deltaTemperature.plus}
                      />
                    </div>
                  </div>
                  <div>
                    <Label title="Delta (C°)" />
                    <ResultCalcul
                      result={
                        formik.values.deltaTemperature.plus -
                        formik.values.deltaTemperature.moins
                      }
                    />
                  </div>
                </div>
              </Animated>
            )}
            <div className="my-4 h-0.5 w-full bg-gray-100" />
          </div>
          {page === 1 && (
            <Stepper>
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Porte d'entrée"
                name="porteEntree"
                handleTotal={handleTotal}
                random={random}
              />

              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Fenêtre (double vitrage, chassi métal)"
                name="fenetre"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Mur extérieur (ouvrants) façade"
                name="mur"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Vitrage toiture"
                name="vitrageToiture"
                handleTotal={handleTotal}
                random={random}
              />

              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Toiture"
                name="toiture"
                handleTotal={handleTotal}
                random={random}
              />
            </Stepper>
          )}
          {page === 2 && (
            <Stepper>
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Plancher haut, terrasse"
                name="plancherHaut"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Plancher haut sur LNC"
                name="plancherHautSurLnc"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Plancher bas sur vide sanitaire"
                name="plancherBasSurVideSanitaire"
                handleTotal={handleTotal}
                random={random}
              />

              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Plancher bas sur LNC"
                name="plancherBasSurLnc"
                handleTotal={handleTotal}
                random={random}
              />
            </Stepper>
          )}
          {page === 3 && (
            <Stepper>
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Mur de séparation batiment"
                name="murSeparationBatiment"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Refend mur porteur y/c porte"
                name="refendMurPorteur"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Refend dégagement y/c porte"
                name="refendDegagement"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Cloison intérieure y/c porte"
                name="cloissonInterieur"
                handleTotal={handleTotal}
                random={random}
              />
            </Stepper>
          )}
          {page === 4 && (
            <Stepper>
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Kl plancher sur terre plein"
                name="klPnahcerSurTerrePleine"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Kl mur enterré à 2.7m du sol"
                name="klMurEnterre"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Kl plancher bas enterré"
                name="klPlancherBasEnterre"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Kl plancher intermédiaire sur LNC"
                name="klPlancherIntermediaireSurLnc"
                handleTotal={handleTotal}
                random={random}
              />

              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Kl plancher intermédiaire"
                name="klPlancherIntermediaire"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Kl plancher refend/façade"
                name="klPlancherRefend"
                handleTotal={handleTotal}
                random={random}
              />
              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Kl chassis fenêtre"
                name="klChassisFenetre"
                handleTotal={handleTotal}
                random={random}
              />

              <DeperdissionNormale
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Kl volant roulant"
                name="klVoletRoulant"
                handleTotal={handleTotal}
                random={random}
              />
            </Stepper>
          )}
          {page === 5 && (
            <Stepper>
              <Imputat
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Entrée d'air (Qe)"
                name="entreeAir"
                handleTotal={handleTotal}
                random={random}
              />
              <CalculSpecial
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Perméabilité ouvrante"
                name="permeabiliteOuvrante"
                handleTotal={handleTotal}
                random={random}
              />
              <CalculSpecial
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Perméabilité volet roulant (linéaire)"
                name="permeabiliteVoletRoulant"
                handleTotal={handleTotal}
                random={random}
              />
              <CalculAir
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Renouvellement air (QV)"
                name="renouvellementAir"
                handleTotal={handleTotal}
                random={random}
              />
              <TransfertAir
                delta={
                  formik.values.deltaTemperature.plus -
                  formik.values.deltaTemperature.moins
                }
                title="Transfert d'air"
                name="transfertAir"
                handleTotal={handleTotal}
                random={random}
              />
            </Stepper>
          )}
          <Pagination pages={[1, 2, 3, 4, 5]} changePage={changePage} />
        </form>

        <p className="mt-2 mb-2 block text-lg font-semibold uppercase tracking-wide text-gray-700">
          Déperdission thermique total :{' '}
          <span className="text-red-400">
            {total} w <span className="ml-4">{total / 1000} K.w</span>
          </span>
        </p>
        <div className="mt-4 flex items-center justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Réinitialiser
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Exporter
          </button>
        </div>
        <Modal isOpen={isOpen} handleClose={handleModal}>
          <ModalComp
            delta={
              formik.values.deltaTemperature.plus -
              formik.values.deltaTemperature.moins
            }
            air={'something'}
            handleClose={handleModal}
            deperdission={true}
            deperdissionThermique={total}
          />
        </Modal>
      </Paper>{' '}
    </DashboardContainer>
  )
}

export default Deperdission
