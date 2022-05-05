import { useFormik } from 'formik'
import { handleCheck } from '../../api'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Validate = () => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: async () => {},
  })
  const handleSubmit = async () => {
    const res = await handleCheck(formik.values.code)
    if (res) {
      localStorage.setItem('clim', 'token exists')
      router.push('/home')
    } else {
      setError(true)
    }
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex w-2/3 flex-col rounded-xl border p-4 shadow-sm lg:w-1/2">
        <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
          <p className="text-center text-3xl">Bienvenue</p>
          <p className="mt-4 text-center text-xl">
            Afin de dévérouiller l'application, veuillez introduire le code
            fournis par votre fournisseur
          </p>

          <div className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg text-black">
                Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                onChange={formik.handleChange}
                placeholder="PXKSIDKQ"
                className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="mt-8 bg-black p-2 text-lg font-bold text-white hover:bg-gray-700"
            >
              Valider
            </button>
            {error && (
              <p className="text-sm text-red-500">
                Le code que vous avez écrit est incorrect, veuillez contacter
                votre fournisseur pour avoir un nouveau
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Validate
