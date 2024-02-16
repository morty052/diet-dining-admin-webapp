import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { AddProductTable, TabsBuilder, StoreTable } from 'src/components'
import { Lightbulb } from 'lucide-react'

type Props = {}

const fetchStores = async () => {
  // const res = await fetch(`http://192.168.100.16:3000/stores/get-all`)
  const res = await fetch(`http://localhost:3000/stores/get-all`)
  const data = await res.json()
  console.log(data)
  return data
}
function AllStores() {
  const { data: stores, isLoading } = useQuery(['stores'], fetchStores)

  if (!stores) {
    return null
  }

  return (
    <div className="">
      <div className="ml-1 pt-4">
        <p className="text-white">Manage All Stores</p>
      </div>
      <StoreTable title="Manage all stores" stores={stores} />
    </div>
  )
}

function ApprovedStoresScreen() {
  const { data: stores, isLoading } = useQuery(['stores'], fetchStores)
  return (
    <div className="">
      <div className="ml-1 pt-4">
        <p className="text-white">Manage All Approved Stores</p>
      </div>
      <StoreTable title="Manage all stores" stores={stores} />
    </div>
  )
}

function OnboardingStoresScreen() {
  const { data: stores, isLoading } = useQuery(['stores'], fetchStores)
  return (
    <div className="">
      <div className="ml-1 pt-4">
        <p className="text-white">Manage All Onboarding Stores</p>
      </div>
      <StoreTable title="Manage all stores" stores={stores} />
    </div>
  )
}

function Addproduct() {
  return (
    <div className="">
      <p className="text-white">Add Product</p>
    </div>
  )
}

const tabItems = [
  {
    title: 'All',
    value: 'all',
    component: <AllStores />,
  },
  {
    title: 'Approved',
    value: 'approved',
    component: <ApprovedStoresScreen />,
  },
  {
    title: 'Onboarding',
    value: 'onboarding',
    component: <OnboardingStoresScreen />,
  },
  // {
  //   title: 'Paused',
  //   value: 'paused',
  //   component: <ApprovedStoresScreen />,
  // },
]

const products = [
  {
    name: 'Sandy hook Special',
    image: '',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate unde repellat reiciendisarchitecto quidem ad non accusantium distinctio quisquam accusamus provident, sequi harum et vero iusto ipsum quae fugit?',
    price: 400,
  },
  {
    name: 'Krabby Patty',
    image: '',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate unde repellat reiciendisarchitecto quidem ad non accusantium distinctio quisquam accusamus provident, sequi harum et vero iusto ipsum quae fugit?',
    price: 400,
  },
  {
    name: 'Orange Soda',
    image: '',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate unde repellat reiciendisarchitecto quidem ad non accusantium distinctio quisquam accusamus provident, sequi harum et vero iusto ipsum quae fugit?',
    price: 400,
  },
]

export function StoreManager({}: Props) {
  return (
    <div className="mx-auto max-w-7xl px-2 pt-6">
      <TabsBuilder defaultValue={tabItems?.[0].value} tabItems={tabItems} />
      <div className=" pt-6"></div>
    </div>
  )
}
