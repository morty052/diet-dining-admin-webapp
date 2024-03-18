import React from 'react'
import { Button } from 'src/components/ui/button'
import { Plus, Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import AffiliateOrders from './routes/AffiliateOrders'
import { StoreManager } from '../store-manager'
import AffiliateProductManager from './routes/AffiliateProductManager'
import { BarChart, Header } from 'src/components'

function DashboardInfoCard({ title, figure }: { title: string; figure: string | number }) {
  return (
    <div className="w-full rounded-sm  border px-4 py-2 lg:w-1/4">
      {/* Header */}
      <div className="flex justify-between">
        <p className="text-white">{title}</p>
        <p className="text-lg text-white">$</p>
      </div>
      {/* Info */}
      <div className="space-y-2">
        <p className="text-3xl font-semibold text-white">{figure}</p>
        <p className=" text-gray-300">+0.00 from last month</p>
      </div>
    </div>
  )
}

function RecentSalesCard() {
  const sales = [
    {
      customer_name: 'Olivier Martin',
      customer_email: 'Olivier@gmail.com',
      price: 330,
    },
    {
      customer_name: 'Andrew Killcoff',
      customer_email: 'Andrew@gmail.com',
      price: 1430,
    },
    {
      customer_name: 'Keegan Matthew',
      customer_email: 'keegan@gmail.com',
      price: 240,
    },
    {
      customer_name: 'Welma Flintstone',
      customer_email: 'Welma@gmail.com',
      price: 320,
    },
    {
      customer_name: 'Patrick Star',
      customer_email: 'patrick@gmail.com',
      price: 200,
    },
  ]

  const SaleItem = ({
    customer_name,
    customer_email,
    price,
  }: {
    customer_name: string
    customer_email: string
    price: number
  }) => {
    return (
      <div className="flex items-center justify-between">
        <div className="grid h-8 w-8 place-content-center rounded-full border border-white">
          <p className="font-black text-green-400">{customer_name?.charAt(0)}</p>
        </div>
        <div className="ml-2 flex-1">
          <p className="text-gray-50">{customer_name}</p>
          <p className="text-sm text-gray-50/80 ">{customer_email}</p>
        </div>
        <p className="text-lg font-semibold text-white">${price}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-lg border border-white/50 p-4 lg:w-2/5">
      <div className="">
        <p className="text-lg font-semibold text-white">Recent Sales</p>
        <p className="text-sm font-semibold text-gray-300">You made 256 sales this month.</p>
      </div>
      {sales.map((sale, index) => (
        <SaleItem
          key={index}
          customer_email={sale.customer_email}
          customer_name={sale.customer_name}
          price={sale.price}
        />
      ))}
    </div>
  )
}

function QuickActionsTab() {
  return (
    <div className="w-full max-w-xs rounded-lg border">
      <div className="">Add Item</div>
    </div>
  )
}

function DownLoadReportButton() {
  return (
    <div className="">
      <div className="flex gap-x-2">
        {/* @ts-ignore */}
        <label htmlFor=""></label>
        <input className="w-40 rounded-md px-2 placeholder:text-center" title="date" placeholder="" type="date" />
        <Button className="bg-white text-black">Download</Button>
      </div>
    </div>
  )
}

function OverView({ sales, total_revenue }: { sales: number; total_revenue: number }) {
  return (
    <div className="">
      <div className="grid  gap-4 pb-4 md:pb-0  ">
        {/* DEFAULT LAYOUT INFO CARDS */}
        <div className="flex flex-col gap-y-4 pt-4 md:hidden">
          <DashboardInfoCard figure={total_revenue} title="Total Revenue" />
          <DashboardInfoCard figure={sales} title="Sales" />
          <DashboardInfoCard figure="14" title="Pending Orders" />
          <DashboardInfoCard figure="3" title="Active Promos" />
        </div>
        <div className="flex flex-col gap-2  pt-4 lg:hidden  ">
          {/* MEDIUM LAYOUT INFO CARDS */}
          <div className="hidden gap-x-6 md:flex">
            <DashboardInfoCard figure={total_revenue} title="Total Revenue" />
            <DashboardInfoCard figure={sales} title="Sales" />
          </div>
          <div className="hidden gap-x-6 md:flex">
            <DashboardInfoCard figure="14" title="Pending Orders" />
            <DashboardInfoCard figure="3" title="Active Promos" />
          </div>
        </div>
        {/* LARGER LAYOUT INFO CARDS */}
        <div className="hidden gap-2  pt-4 lg:flex  ">
          <DashboardInfoCard figure={total_revenue} title="Total Revenue" />
          <DashboardInfoCard figure={sales} title="Sales" />

          <DashboardInfoCard figure="14" title="Pending Orders" />
          <DashboardInfoCard figure="3" title="Active Promos" />
        </div>
        <div className="flex w-full flex-col gap-y-8 lg:flex-row-reverse lg:gap-x-8 ">
          <RecentSalesCard />
          <BarChart />
        </div>
      </div>
    </div>
  )
}

function ProductsTab({ menu }: { menu: any }) {
  return (
    <div className="">
      {/* <input placeholder="search for product" className="w-full rounded-lg border p-2" type="text" /> */}
      <div className=" space-y-6 overflow-y-scroll ">
        {menu?.map((item: any, index: number) => (
          <div key={index} className="">
            <p className="mb-4 text-xl font-semibold text-white">{item.title}</p>
            <div className="mb-2 space-y-8">
              {item.products.map((product: any, index: number) => (
                <div key={index} className="flex  rounded-lg border">
                  <img className="h-28 w-28 rounded-l-lg object-cover" src={product.image} alt="" />
                  <div className="p-2">
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-white">${product.price}</p>
                    <p className="text-sm text-white">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Hours() {
  const hours = [
    {
      day: 'Sunday',
      opening: '8:00',
      closing: '9:00',
    },
    {
      day: 'Monday',
      opening: '8:00',
      closing: '9:00',
    },
    {
      day: 'Tuesday',
      opening: '8:00',
      closing: '9:00',
    },
    {
      day: 'Wednesday',
      opening: '8:00',
      closing: '9:00',
    },
    {
      day: 'Thursday',
      opening: '8:00',
      closing: '9:00',
    },
    {
      day: 'Friday',
      opening: '8:00',
      closing: '9:00',
    },
    {
      day: 'Saturday',
      opening: '8:00',
      closing: '9:00',
    },
  ]

  const DayItem = ({ day, opening, closing }: { day: string; opening: string; closing: string }) => {
    return (
      <div className="flex justify-between rounded-lg border p-2">
        <p className="text-white">{day}</p>
        <div className="flex gap-x-8">
          <p className="text-green-400">{opening} AM</p>
          <p className="text-white">-</p>
          <p className="text-red-400">{closing} PM</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-6">
      {hours.map((item) => (
        <DayItem key={item.day} day={item.day} opening={item.opening} closing={item.closing} />
      ))}
    </div>
  )
}

function Promos() {
  return (
    <div className="">
      <div className=""></div>
    </div>
  )
}

function StoreManagerTab() {
  function StoreTag({ name, isAddNewTagButton }: { name: string; isAddNewTagButton?: boolean }) {
    if (isAddNewTagButton) {
      return (
        <div className="group  inline-flex  cursor-pointer  rounded-lg bg-white px-2  py-1 hover:bg-green-400">
          <div className="flex w-full flex-row items-center  gap-x-1 ">
            <Plus size={10} color="blue" />
            <p className="text0white flex-1 text-xs font-medium group-hover:text-white">Add new tag</p>
          </div>
        </div>
      )
    }

    return (
      <div className="inline-flex   justify-center rounded-lg bg-green-300 px-4 py-1">
        {!isAddNewTagButton && <p className="text0white text-xs font-medium">{name}</p>}
      </div>
    )
  }

  function StoreRatingGrid({ store_ratings_count }: { store_ratings_count: number }) {
    return (
      <div className="flex items-center gap-x-4 py-2">
        <div className="flex  gap-x-4">
          <Star size={20} color="green" />
          <Star size={20} color="green" />
          <Star size={20} color="green" />
          <Star size={20} color="green" />
          <Star size={20} color="green" />
        </div>
        <p className="font-medium text-white">({store_ratings_count}) ratings</p>
      </div>
    )
  }

  async function fetchStore() {
    const _id = localStorage.getItem('_id')
    console.log(_id)
    const res = await fetch(`http://localhost:3000/affiliates/get-affiliate-stores?afilliate_id=${_id}`)
    const data = await res.json()
    console.log(data)
    return data[0]
  }

  const { isLoading, data: store } = useQuery({ queryKey: [''], queryFn: fetchStore })

  if (isLoading) {
    return null
  }

  const { store_name, store_image, store_logo, store_address, menu, store_description, store_ratings_count } =
    store ?? {}

  return (
    <div className="grid grid-cols-2 ">
      {/* LEFT SIDE */}
      <div className="col-span-2 lg:col-span-1">
        <div className="sticky top-0">
          {/* BACKGROUND IMAGE */}
          <div className="relative h-[200px]">
            <img className="h-full  w-full object-cover" src={store_image} alt="" />
            <div className="absolute bottom-0 ">
              <img className=" h-20 w-20 rounded-full object-cover" src={store_logo} alt="" />
            </div>
          </div>
          {/* STORE DETAILS */}
          <div className="p-2">
            <p className="text-white">{store_name}</p>
            <p className="text-white">{store_address?.street}</p>
            <StoreRatingGrid store_ratings_count={store_ratings_count} />
            {/* TAGS */}
            <div className="flex flex-row flex-wrap items-center gap-4 py-2">
              <StoreTag name="Salads" />
              <StoreTag name="Parfaits" />
              <StoreTag name="Drinks" />
              <StoreTag name="Lean Meats" />
              <StoreTag name="Korean" />
              <StoreTag name="Halal" />
              <StoreTag name="Sea Food" />
              <StoreTag isAddNewTagButton name="Keto" />
            </div>
            <div className="mt-2 h-40 rounded-lg border p-2">
              <p className="text-sm text-white">{store_description}</p>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className=" hidden space-y-4 overflow-y-scroll border-l px-4 py-2 lg:block">
        <ProductsTab menu={menu} />
        {/* <Tabs defaultValue="products" className="">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="promos">Promos</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
          </TabsContent>
          <TabsContent value="hours">
            <Hours />
          </TabsContent>
          <TabsContent value="promos">
            <Hours />
          </TabsContent>
        </Tabs> */}
      </div>
    </div>
  )
}

function Dashboard() {
  async function fetchAffiliate() {
    const _id = localStorage.getItem('_id')
    const res = await fetch(`http://localhost:3000/affiliates/get-affiliate?afilliate_id=${_id}`)
    const data = await res.json()
    console.log(data)
    return data
  }
  const { isLoading, data: affiliate } = useQuery({ queryKey: [''], queryFn: fetchAffiliate })

  // if (isLoading) {
  //   return null
  // }

  const { sales, total_revenue } = affiliate ?? {}

  console.log(affiliate)

  return (
    <div className="relative px-4 pt-6">
      <div className="flex justify-end md:justify-between">
        <p className="hidden text-2xl font-semibold text-white md:block">Dashboard</p>
        <DownLoadReportButton />
      </div>
      {/* <Tabs defaultValue="overview" className="">
        <TabsList>
          <TabsTrigger className="w-[100px]" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="w-[100px]" value="store">
            Store Front
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          
        </TabsContent>
        <TabsContent value="store">
          <StoreManagerTab />
        </TabsContent>
      </Tabs> */}
      <OverView total_revenue={total_revenue} sales={sales} />
    </div>
  )
}

export function AffiliateDashboard() {
  return (
    <div className=" mx-auto min-h-screen max-w-7xl  bg-darkGrey">
      {/* HEADER */}
      <Header firstname="Abdul" isAffiliate />
      {/* Container */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<AffiliateOrders />} />
        <Route path="/store/*" element={<StoreManager />} />
        <Route path="/products/*" element={<AffiliateProductManager />} />
      </Routes>
    </div>
  )
}
