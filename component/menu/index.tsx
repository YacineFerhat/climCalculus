import Link from 'next/link'
interface Props {
  title: string
  description: string
  link: string
}

const Menu = ({ title, description, link }: Props) => {
  return (
    <div className="w-full">
      <Link href={`/${link}`}>
        <div className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-4">
          <p className="font-semibold">{title}</p>
          <p className="mt-4 text-center font-extralight	">{description}</p>
        </div>
      </Link>
    </div>
  )
}

export default Menu
