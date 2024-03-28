import React from 'react'
import AllOrdersTable from '../components/AllOrdersTable'
import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Route, Routes } from 'react-router-dom'
import { baseUrl } from '../../../constants/baseUrl'

async function fetchOrders() {
  console.log('fetching')
  const _id = localStorage.getItem('_id')
  const res = await fetch(`${baseUrl}/admin/get-all-orders`)
  const data = await res.json()
  console.log(data)
  return data.data
}

function OrdersManagerHome({ orders }) {
  return (
    <div className="mx-auto max-w-7xl px-2 pt-6 md:px-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger className="w-[100px]" value="all">
            All
          </TabsTrigger>
          <TabsTrigger className="w-[100px]" value="pending">
            Pending
          </TabsTrigger>
          <TabsTrigger className="w-[100px]" value="completed">
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="">
            <AllOrdersTable orders={orders} />
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <AllOrdersTable orders={orders} />
        </TabsContent>
        <TabsContent value="completed">
          <AllOrdersTable orders={orders} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderPage(params: type) {
  return (
    <div className="py-8">
      <div className="">
        <p className="text-white"> Hello orders</p>
      </div>
    </div>
  )
}

function OrdersManager() {
  const { isLoading, data: orders } = useQuery({ queryKey: ['adminorders'], queryFn: fetchOrders })

  if (isLoading || !orders) {
    return null
  }
  return (
    <Routes>
      <Route path="/" element={<OrdersManagerHome orders={orders} />} />
      <Route path="/order/:id" element={<OrderPage orders={orders} />} />
    </Routes>
  )
}

export default OrdersManager
