import React from 'react'
import { Route, Routes, Link, useParams } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { Store } from '../store'
import Orders from '../orders'
import { StoreManager } from '../store-manager'
import { Chart, AxisOptions } from 'react-charts'
import { StoreOnboarding } from '../store-onboarding'

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

type Props = {}

const RenderLineChart = () => {
  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyStars> => ({
      getValue: (datum) => datum.date,
      elementType: 'bar',
    }),
    [],
  )

  const secondaryAxes = React.useMemo((): AxisOptions<DailyStars>[] => [{ getValue: (datum) => datum.stars }], [])
  return (
    <div className="max-w-xl flex-1 bg-white">
      <Chart options={{ data, primaryAxis, secondaryAxes }} />
    </div>
  )
}

function DashboardInfoCard({ title }: { title: string }) {
  return (
    <div className="mx-auto w-full  rounded-sm border px-4 py-2">
      {/* Header */}
      <div className="flex justify-between">
        <p className="text-white">{title}</p>
        <p className="text-lg text-white">$</p>
      </div>
      {/* Info */}
      <div className="space-y-2">
        <p className="text-3xl font-semibold text-white">$14,500</p>
        <p className=" text-gray-300">+0.00 from last month</p>
      </div>
    </div>
  )
}

function RecentSalesCard({}) {
  const SaleItem = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="h-8 w-8 rounded-full border border-white"></div>
        <div className="ml-2 flex-1">
          <p className="text-white">Olivia martin</p>
          <p className="text-white">Olivia.martin@email.com</p>
        </div>
        <p className="text-lg font-semibold text-white">$1,990</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-lg border p-2">
      <div className="">
        <p className="text-lg font-semibold text-white">Recent Sales</p>
        <p className="text-sm font-semibold text-gray-300">You made 256 sales this month.</p>
      </div>
      <SaleItem />
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

function Header() {
  const id = localStorage.getItem('id')
  return (
    <div className="p-2">
      <div className=" flex w-full items-center justify-between rounded-md border border-white px-4 py-2">
        <p className="text-gray-50">Dashboard</p>
        {/* LINKS */}
        <div className="hidden gap-4 sm:flex">
          <Link to={'/dashboard/' + id} className="text-sm text-white">
            Overview
          </Link>
          <Link to={'orders/' + id} className="text-sm text-white">
            Orders
          </Link>
          <Link to={'store/' + id} className="text-sm text-white">
            Stores
          </Link>
          <p className="text-sm text-white">Notifications</p>
        </div>
        <div className="h-8 w-8 rounded-full border border-white"></div>
      </div>
    </div>
  )
}

function OverView() {
  return (
    <div className="min-h-screen">
      <div className="grid  gap-4 px-4 pt-6 ">
        <div className=" flex justify-between">
          <QuickActionsTab />
          <DownLoadReportButton />
        </div>
        <div className="grid gap-4 pt-4 sm:grid-cols-3">
          <DashboardInfoCard title="Total Revenue" />
          <DashboardInfoCard title="Sales" />
          <DashboardInfoCard title="Pending Orders" />
        </div>
        <RecentSalesCard />
      </div>
      {/* <div className="flex  justify-between">
        <RenderLineChart />
        <RecentSalesCard />
      </div> */}
    </div>
  )
}

export function Dashboard({}: Props) {
  return (
    <div className=" min-h-screen bg-black">
      {/* HEADER */}
      <Header />
      {/* Container */}
      <Routes>
        <Route path="/:id" element={<OverView />} />
        <Route path="/orders/:id" element={<Orders />} />
        <Route path="/store/:id/*" element={<StoreManager />} />
      </Routes>
    </div>
  )
}
