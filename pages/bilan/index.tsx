import { Paper } from '../../component/paper'
import { useState, useEffect } from 'react'
import {
  CalculNormal,
  CalculMur,
  CalculPlancher,
  SmallCalcul,
  ModalComp,
  DeltaTemperature,
  Air,
} from '../../component/bilan'
import { Stepper, Pagination, Modal } from '../../component'
import { DashboardContainer } from '../../component/container'

const Bilan = () => {
  const [values, setValues] = useState({
    vitrageAvecStoreExterieur: 0,
    vitrageAvecStoreInterieur: 0,
    vitrageSansStore: 0,
    DoubleVitrageSansStore: 0,
    vitrageALombre: 0,
    mursExterieursEnsoleillés: 0,
    mursExterieursEnsoleillésNonIsolés: 0,
    mursALombreIsoles: 0,
    mursALombreNonIsoles: 0,
    cloisonsInterieurLocalNonClimatisé: 0,
    porteContinuellementOuverte: 0,
    plancherIsole: 0,
    plancherNonIsole: 0,
    plafondIsolé: 0,
    plafondNonIsoléEnDessousToit: 0,
    nombreOccupant: 0,
    appareilElectrique: 0,
    eclairage: 0,
    moteur: 0,
    autreSource: 0,
    air: 0,
  })
  const handleTotal = (event: any, name: string) => {
    setValues((previousState) => ({
      ...previousState,
      [name]: event,
    }))
  }
  const [page, setPage] = useState(1)
  const changePage = (event: number) => {
    setPage(event)
  }

  const [climatisationTotal, setClimatisationTotal] = useState(0)
  const [chauffageTotal, setChauffageTotal] = useState(0)

  useEffect(() => {
    const array = Object.values(values)
    const sum = array.reduce((accumulator, value) => {
      return accumulator + value
    }, 0)
    setClimatisationTotal(sum)
    setChauffageTotal(sum * (1 + 30 / 100))
  }, [values])

  const [isOpen, setIsOpen] = useState(false)
  const handleModal = (state: boolean) => {
    setIsOpen(state)
  }

  const [deltaTemperature, setDeltaTemperature] = useState(0)
  const handleChangeDelta = (input: number) => {
    setDeltaTemperature(input)
  }

  const [airData, setAirData] = useState(null)
  const handleForm = (event: any) => {
    setAirData(event)
  }
  const [random, setRandom] = useState(0)
  const handleReset = () => {
    setRandom(Math.random() * 10000)
  }
  return (
    <DashboardContainer>
      <Paper>
        <p className="text-lg font-medium">Bilan thermique :</p>
        <p className="text-md font-light">
          Des puissances frigorifiques et calorifiques pour une climatisation et
          un chauffage de confort{' '}
        </p>
        <p className="text-md font-light">
          Afin de calculer votre bilan, veuillez remplir les champs suivants
        </p>
        <div className="my-4 h-0.5 w-full bg-gray-100" />
        <form className="mt-4 w-full ">
          {page === 1 && (
            <Stepper>
              <CalculNormal
                title="Vitrage aves store extérieur (E-SE-S-SO-O)"
                name="vitrageAvecStoreExterieur"
                handleTotal={handleTotal}
                initialKdt={90}
                random={random}
              />
              <CalculNormal
                title="Vitrage avec store intérieur (E-SE-S-SO-O)"
                name="vitrageAvecStoreInterieur"
                handleTotal={handleTotal}
                initialKdt={160}
                random={random}
              />
              <CalculNormal
                title="Simple vitrage sans store (E-SE-S-SO-O)"
                name="vitrageSansStore"
                handleTotal={handleTotal}
                initialKdt={400}
                random={random}
              />
              <CalculNormal
                title="Double vitrage sans store (E-SE-S-SO-O)"
                name="DoubleVitrageSansStore"
                handleTotal={handleTotal}
                initialKdt={350}
                random={random}
              />
              <CalculNormal
                title="Vitrage à l'ombre"
                name="vitrageALombre"
                handleTotal={handleTotal}
                initialKdt={50}
                random={random}
              />
            </Stepper>
          )}

          {page === 2 && (
            <Stepper>
              <CalculMur
                title="Murs extérieurs ensoleillés, isolés"
                name="mursExterieursEnsoleillés"
                handleTotal={handleTotal}
                initialKdt={7}
                random={random}
              />
              <CalculMur
                title="Murs extérieurs ensoleillés, non isolés"
                name="mursExterieursEnsoleillésNonIsolés"
                handleTotal={handleTotal}
                initialKdt={20}
                random={random}
              />
              <CalculMur
                title="Murs à l'ombre, isolés"
                name="mursALombreIsoles"
                handleTotal={handleTotal}
                initialKdt={5}
                random={random}
              />
              <CalculMur
                title="Murs à l'ombre, non isolés"
                name="mursALombreNonIsoles"
                handleTotal={handleTotal}
                initialKdt={11}
                random={random}
              />
              <CalculMur
                title="Cloisons intérieures sur local non climatisé"
                name="cloisonsInterieurLocalNonClimatisé"
                handleTotal={handleTotal}
                initialKdt={15}
                random={random}
              />
              <CalculMur
                title="Porte continuellement ouverte sur local non climatisé"
                name="porteContinuellementOuverte"
                handleTotal={handleTotal}
                initialKdt={240}
                random={random}
              />
            </Stepper>
          )}
          {page === 3 && (
            <Stepper>
              <DeltaTemperature
                handleTotal={handleChangeDelta}
                random={random}
              />
              <CalculPlancher
                title="Plancher isolé (sauf sur terre plein ou cave)"
                name="plancherIsole"
                handleTotal={handleTotal}
                initialKdt={8}
                delta={deltaTemperature}
                random={random}
              />
              <CalculPlancher
                title="Plancher non isolé "
                name="plancherNonIsole"
                handleTotal={handleTotal}
                initialKdt={15}
                delta={deltaTemperature}
                random={random}
              />
              <CalculPlancher
                title="Plafond isolé (sauf dessous local climatisé)"
                name="plafondIsolé"
                handleTotal={handleTotal}
                initialKdt={5}
                delta={deltaTemperature}
                random={random}
              />
              <CalculPlancher
                title="Plafond non isolé"
                name="plafondNonIsolé"
                handleTotal={handleTotal}
                initialKdt={10}
                delta={deltaTemperature}
                random={random}
              />{' '}
              <CalculPlancher
                title="Plafond non isolé (en dessous d'un toit)"
                name="plafondNonIsoléEnDessousToit"
                handleTotal={handleTotal}
                initialKdt={20}
                delta={deltaTemperature}
                random={random}
              />
            </Stepper>
          )}

          {page === 4 && (
            <Stepper>
              <SmallCalcul
                title="Nombre d'occupants"
                name="nombreOccupant"
                handleTotal={handleTotal}
                initialKdt={150}
                mesure="occ"
                random={random}
              />
              <SmallCalcul
                title="Appareils éléctriques"
                name="appareilElectrique"
                handleTotal={handleTotal}
                initialKdt={1}
                mesure="Watt"
                random={random}
              />
              <SmallCalcul
                title="Eclairage"
                name="eclairage"
                handleTotal={handleTotal}
                initialKdt={1}
                mesure="Watt"
                random={random}
              />
              <SmallCalcul
                title="Moteurs"
                name="moteur"
                handleTotal={handleTotal}
                initialKdt={1}
                mesure="Watt"
                random={random}
              />
              <SmallCalcul
                title="Autres sources de chaleur"
                name="autreSource"
                handleTotal={handleTotal}
                initialKdt={1.163}
                mesure="Watt"
                random={random}
              />
              <DeltaTemperature
                handleTotal={handleChangeDelta}
                random={random}
              />
              <Air
                title="Gains par renouvellement d'air"
                name="air"
                handleTotal={handleTotal}
                delta={deltaTemperature}
                handleForm={handleForm}
                random={random}
              />
            </Stepper>
          )}
          <p className="font-thin text-red-400">
            Vous n'êtes pas obligés de tout remplir pour faire votre calcul,
            remplissez que les valeurs dont vous avez besoin
          </p>
          <Pagination pages={[1, 2, 3, 4]} changePage={changePage} />
        </form>

        <p className="mt-2 mb-2 block text-lg font-semibold uppercase tracking-wide text-gray-700">
          Bilan climatisation total :{' '}
          <span className="text-blue-400">
            {climatisationTotal.toFixed(2)} w{' '}
            <span className="ml-4">
              {(climatisationTotal / 1000).toFixed(2)} K.w
            </span>
          </span>
        </p>
        <p className="mb-2 block text-lg font-semibold uppercase tracking-wide text-gray-700">
          Bilan chauffage total :{' '}
          <span className="text-red-400">
            {chauffageTotal.toFixed(2)} w{' '}
            <span className="ml-4">
              {(chauffageTotal / 1000).toFixed(2)} K.w
            </span>
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
      </Paper>{' '}
      <Modal isOpen={isOpen} handleClose={handleModal}>
        <ModalComp
          climatisationTotal={climatisationTotal}
          chauffageTotal={chauffageTotal}
          air={airData}
          handleClose={handleModal}
          delta={deltaTemperature}
          deperdission={false}
        />
      </Modal>
    </DashboardContainer>
  )
}

export default Bilan
