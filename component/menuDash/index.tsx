import Link from 'next/link'
import clsx from 'clsx'
import { menu } from '../../data/menu'
import { useRouter } from 'next/router'

interface Props {}
interface data {
  title: string
  link: string
  description: string
}

export const MenuDashboard: React.FunctionComponent<Props> = () => {
  const router = useRouter()
  const isCurrentRoute = (link: string) => {
    return router.pathname === link
  }
  return (
    <div className="font-raleway relative my-4 ml-4 hidden h-screen w-80 shadow-lg lg:block">
      <div className="h-screen rounded-2xl bg-white">
        <nav className="">
          <div>
            {menu.map((menu: data, index: number) => (
              <Link key={index} href={menu.link}>
                <a
                  className={clsx(
                    ' my-2 flex w-full  items-center justify-start p-4 font-thin uppercase transition-colors duration-200 hover:text-blue-500 ',
                    isCurrentRoute(menu.title)
                      ? 'border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 text-blue-500'
                      : ' text-gray-500 '
                  )}
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2048 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={menu.title}></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">{menu.title}</span>
                </a>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
