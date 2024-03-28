import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { BarChart, Header } from '../../components'
import Notifications from './routes/Notifications'
import { useQuery } from '@tanstack/react-query'
import { AffiliatesManager } from './routes/affiliates-manager'
import OrdersManager from './routes/OrdersManager'
import { baseUrl } from '../../constants/baseUrl'

type DailyStars = {
  date: Date
  stars: number
}

type Series = {
  label: string
  data: DailyStars[]
}

const data: Series[] = [
  {
    label: 'React Charts',
    data: [
      {
        date: new Date(),
        stars: 202123,
      },
      // ...
    ],
  },
  {
    label: 'React Query',
    data: [
      {
        date: new Date(),
        stars: 10234230,
      },
      {
        date: new Date(),
        stars: 104230,
      },
      {
        date: new Date(),
        stars: 10230,
      },
      // ...
    ],
  },
]

type OrderProps = {
  _id: string
  total: number
  date: string
  products: { name: string; price: number; quantity: number; image: string }[]
  user: {
    email: string
    firstname: string
    lastname: string
  }
}

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

function OverView({ sales, total_revenue, orders }: { sales: number; total_revenue: number | string; orders: any }) {
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
          <RecentSalesCard orders={orders} />
          <BarChart />
        </div>
      </div>
    </div>
  )
}

function RecentSalesCard({ orders }: { orders: any }) {
  // const sales = [
  //   {
  //     customer_name: 'Olivier Martin',
  //     customer_email: 'Olivier@gmail.com',
  //     price: 330,
  //   },
  //   {
  //     customer_name: 'Andrew Killcoff',
  //     customer_email: 'Andrew@gmail.com',
  //     price: 1430,
  //   },
  //   {
  //     customer_name: 'Keegan Matthew',
  //     customer_email: 'keegan@gmail.com',
  //     price: 240,
  //   },
  //   {
  //     customer_name: 'Welma Flintstone',
  //     customer_email: 'Welma@gmail.com',
  //     price: 320,
  //   },
  //   {
  //     customer_name: 'Patrick Star',
  //     customer_email: 'patrick@gmail.com',
  //     price: 200,
  //   },
  // ]

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
    <div className=" space-y-4 overflow-y-scroll rounded-lg border border-white/50 p-4 lg:w-2/5">
      <div className="">
        <p className="text-lg font-semibold text-white">Recent Sales</p>
        <p className="text-sm font-semibold text-gray-300">You made 256 sales this month.</p>
      </div>
      <div className="max-h-[400px] space-y-4 overflow-y-scroll ">
        {orders?.map((order: OrderProps, index: number) => (
          <SaleItem
            key={index}
            customer_email={order.user.email}
            customer_name={order.user.firstname}
            price={order.total}
          />
        ))}
      </div>
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

function AdminDashboard() {
  // async function fetchAffiliate() {
  //   const _id = localStorage.getItem('_id')
  //   const res = await fetch(`http://localhost:3000/affiliates/get-affiliate?afilliate_id=${_id}`)
  //   const data = await res.json()
  //   console.log(data)
  //   return data
  // }

  async function fetchAllOrders() {
    console.log('fetching')
    const res = await fetch(`${baseUrl}/admin/get-all-orders`)
    const data = await res.json()
    console.log(data)
    return data.data
  }
  const { isLoading, data: orders } = useQuery({ queryKey: ['all_orders'], queryFn: fetchAllOrders })

  // if (isLoading) {
  //   return null
  // }

  return (
    <div className="relative px-4 pt-6">
      <div className="flex justify-end md:justify-between">
        <p className="hidden text-2xl font-semibold text-white md:block">Dashboard</p>
        <DownLoadReportButton />
      </div>
      <OverView orders={orders?.slice(0, 6)} total_revenue={`$${7000}`} sales={540} />
    </div>
  )
}

export function Dashboard() {
  return (
    <div className=" mx-auto min-h-screen max-w-7xl bg-darkGrey ">
      {/* HEADER */}
      <Header />
      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/orders/*" element={<OrdersManager />} />
        <Route path="/store/*" element={<AffiliatesManager />} />
        <Route path="notifications" element={<Notifications />} />
      </Routes>
    </div>
  )
}
