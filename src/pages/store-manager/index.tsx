import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { AddProductTable, TabsBuilder, StoreTable } from 'src/components'

type Props = {}

function AllProducts() {
  const fetchStores = async () => {
    const res = await fetch(`http://192.168.100.16:3000/stores/get-all`)
    const data = await res.json()
    return data
    // const res = await fetch(`http://localhost:3000/stores`)
  }

  const { data: stores, isLoading } = useQuery(['stores'], fetchStores)

  if (!stores) {
    return null
  }

  return (
    <div className="">
      <p className="text-white">Manage your Products</p>
      <StoreTable stores={stores} />
    </div>
  )
}

function ManageStoreScreen() {
  return (
    <div className="">
      <p className="text-white">Delete Product</p>
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

function ActionTabs() {
  const TabButton = () => {
    return (
      // <div className="flex gap-x-4">
      //   <p className="text-white">Add Product</p>
      //   <p className="text-white">Delete Product</p>
      //   <p className="text-white">Edit Product</p>
      // </div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    )
  }

  return (
    <div className="">
      <div className="">
        <TabButton />
      </div>
    </div>
  )
}

const tabItems = [
  {
    title: 'All',
    value: 'all',
    component: <AllProducts />,
  },
  {
    title: 'Approved',
    value: 'approved',
    component: <AddProductTable />,
  },
  {
    title: 'Onboarding',
    value: 'onboarding',
    component: <ManageStoreScreen />,
  },
  {
    title: 'Paused',
    value: 'paused',
    component: <ManageStoreScreen />,
  },
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
    <div className="mx-auto max-w-5xl px-4 pt-6">
      <TabsBuilder defaultValue={tabItems?.[0].value} tabItems={tabItems} />
      <div className=" pt-6"></div>
    </div>
  )
}
