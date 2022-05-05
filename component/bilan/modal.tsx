import { Label } from '../label';
import { useFormik } from 'formik';
import jsPDF from 'jspdf';
interface Props {
  handleClose: (e: boolean) => void;
  air: any;
  climatisationTotal?: number;
  chauffageTotal?: number;
  delta: number;
  deperdissionThermique?: number;
  deperdission: boolean;
}

export const ModalComp = ({
  handleClose,
  air,
  climatisationTotal,
  chauffageTotal,
  delta,
  deperdission,
  deperdissionThermique,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      nom: '',
      lieu: '',
    },
    onSubmit: async () => {},
  });
  const inputClass =
    'appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';

  const doc = new jsPDF();

  const handleExport = () => {
    handleClose(false);
    doc.setFontSize(22);
    doc.text(`Nom du site ${formik.values.nom}`, 20, 20);
    doc.text(`Lieu du site ${formik.values.lieu}`, 20, 30);

    if (!deperdission) {
      doc.setTextColor(0, 0, 255);
      doc.text(
        `Climatisation total ${climatisationTotal?.toFixed(2)} w`,
        20,
        50
      );
      doc.setTextColor(255, 0, 0);
      doc.text(`Chauffage total ${chauffageTotal?.toFixed(2)} w`, 20, 60);
      doc.setTextColor('black');
      doc.setFontSize(16);
      doc.text(`Gains par renouvellement d'air :`, 20, 80);

      doc.setFontSize(14);
      doc.text(`Valeur de chaque unité : ${air.valeur}`, 20, 90);
      doc.text(`Quantité : ${air.qte}`, 20, 100);
      doc.text(
        `Volume : ${
          air.volume !== 1 ? air.volume : air.qte * air.valeur
        } M^3/H`,
        20,
        110
      );
      doc.text(
        `Massique : ${
          air.volume !== 1 ? air.volume * 1.15 : air.qte * air.valeur * 1.15
        }`,
        20,
        120
      );
      doc.text(
        `Apport calorifique : ${(
          (air.volume !== 1
            ? air.volume * 1.15 * air.humidite
            : air.qte * air.valeur * 1.15 * air.humidite * 0.68) +
          (air.volume !== 1
            ? air.volume * 1.15 * delta
            : air.qte * air.valeur * 1.15 * delta * 0.284)
        ).toFixed(2)} W`,
        20,
        130
      );
      doc.save(`${formik.values.nom}-${formik.values.lieu}.pdf`);
    } else {
      doc.setTextColor(0, 0, 255);
      doc.text(
        `Déperdission thermique ${deperdissionThermique?.toFixed(2)} w`,
        20,
        50
      );
      doc.save(`${formik.values.nom}-${formik.values.lieu}.pdf`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-lg font-semibold">Exporter votre fichier</p>
      <div className="w-full px-4">
        <Label title={`Nom du site`} />
        <input
          className={inputClass}
          id="grid-first-name"
          type="text"
          placeholder="Nom du site (exemple)"
          onChange={formik.handleChange}
          name="nom"
          value={formik.values.nom}
        />
      </div>
      <div className="w-full px-4">
        <Label title={`Lieu du site`} />
        <input
          className={inputClass}
          id="grid-first-name"
          type="text"
          placeholder="Béchar"
          onChange={formik.handleChange}
          name="lieu"
          value={formik.values.lieu}
        />
      </div>
      <button
        type="button"
        onClick={handleExport}
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Exporter
      </button>
    </div>
  );
};
