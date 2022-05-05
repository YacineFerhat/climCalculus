import { menu } from '../../data/menu'
import Menu from '../../component/menu'
import { DashboardContainer } from '../../component/container'

interface data {
  title: string
  description: string
  link: string
}

export const Home = () => {
  return (
    <DashboardContainer>
      <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {menu.map((data: data) => (
          <Menu
            title={data.title}
            link={data.link}
            description={data.description}
          />
        ))}
      </div>
    </DashboardContainer>
  )
}

export default Home
