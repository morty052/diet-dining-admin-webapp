import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Button } from 'src/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CartModal from 'src/components/modals/CartModal'

type Props = {
  title?: string
  orders: any
}

const orders = [
  {
    store: 'Papa johns',
    status: 'PENDING',
    _id: '',
    cart: [
      {
        name: 'Food',
        price: '20',
        quantity: '1',
        item_id: '848grgrgrv777',
        extras: [],
      },
    ],
    customer: 'anthonyChopra@mail.com',
    total: '400',
  },
]

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

const ViewCartModal = ({ cart, setViewingCart }) => {
  return (
    <div className="fixed inset-0   bg-black py-4">
      <div className="mx-auto w-2/4 rounded-lg bg-white p-2">
        <p onClick={() => setViewingCart(null)} className="text-xl font-medium text-black">
          Cart:
        </p>
        {cart?.map((cart) => {
          const { name, price, quantity, item_id, extras } = cart ?? {}
          return (
            <div key={item_id} className=" ">
              <div className="divide-y py-2">
                <div className=" p-2">
                  <p className="text-black">Name:{name}</p>
                </div>
                <div className=" p-2">
                  <p className="text-black">Price:{price}</p>
                </div>
                <div className="p-2">
                  <p className="text-black">Quantity:{quantity}</p>
                </div>
                {extras?.length > 0 && (
                  <div className=" p-2">
                    <p className="text-black">extras:{quantity}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AllOrdersTable({ title, orders }: Props) {
  const [viewingCart, setViewingCart] = useState(false)
  const navigate = useNavigate()

  console.log(orders)

  if (!orders) {
    return null
  }

  return (
    <>
      {/* DEFAULT TABLE */}
      <div className="hidden py-6 md:block">
        <div className="flex items-center justify-end px-2 pb-4">
          <DownLoadReportButton />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-white">Store</TableHead>
              <TableHead className="text-center text-white">Status</TableHead>
              <TableHead className="text-center text-white">Cart</TableHead>
              <TableHead className="text-center text-white"> Customer</TableHead>
              <TableHead className=" text-center text-white">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {orders?.map((order) => {
              const { _id, status, total, products, user, vendor } = order
              const { store_name } = vendor
              return (
                <TableRow onClick={() => console.log('clicked')} key={order._id} className="">
                  <TableCell className=" border-x text-center font-medium text-white">{store_name}</TableCell>
                  <TableCell className="border-x  text-center text-white ">{'status'}</TableCell>
                  {/* CART */}
                  <CartModal cart={products} />
                  <TableCell className="border-x text-center text-white ">{user}</TableCell>
                  <TableCell className="border-x  text-center text-white ">${total}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {viewingCart && <ViewCartModal setViewingCart={setViewingCart} cart={viewingCart} />}
      </div>
      {/* MOBILE GRID */}
      <div className="space-y-6 pt-4 md:hidden">
        {orders?.map((order, index) => {
          return (
            <div
              onClick={() => navigate(`/dashboard/orders/order/${order._id}`)}
              key={index}
              className="relative h-40 w-full rounded-lg border p-2"
            >
              <div className="flex justify-end">
                <p className="text-sm text-white"> Pending</p>
              </div>
              <div className="flex pt-2">
                <div className="flex-1">
                  <p className="text-white">Papa Johns</p>
                  <p className="text-white">abdul@gmail.com</p>
                  <p className="text-white">$40</p>
                </div>
                <ChevronRight className="self-center text-white" />
              </div>
              <div className="absolute bottom-2 left-2">
                <p className="text-xs text-white">Time ago</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AllOrdersTable
