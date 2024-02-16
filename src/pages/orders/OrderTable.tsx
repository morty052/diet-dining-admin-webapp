import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Button } from 'src/components/ui/button'
import { Lightbulb } from 'lucide-react'

type Props = {
  title: string
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
          const { name, price, quantity, item_id, extras } = cart
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
                {extras.length > 0 && (
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

function OrderTable({ title, orders }: Props) {
  const [viewingCart, setViewingCart] = useState(false)
  return (
    <div className="py-6">
      <div className="flex items-center justify-between px-2">
        <div className="pb-6">
          <p className="textlg mb-2 ml-1 font-medium text-white">{title}</p>
          <div className="flex items-center gap-x-1">
            <Lightbulb size={20} color="gold" />
            <p className="text-white">Click on an order to see extra options</p>
          </div>
        </div>
        <DownLoadReportButton />
      </div>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] text-white">Store</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="w-[100px] text-white">Cart</TableHead>
            <TableHead className="text-white"> Customer</TableHead>
            <TableHead className=" text-white">Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {orders?.map((order) => {
            const { _id, status, total, cart, customer, store } = order
            return (
              <TableRow onClick={() => console.log('clicked')} key={order._id} className="">
                <TableCell className="w-[200px] border-x font-medium text-white">{store}</TableCell>
                <TableCell className="border-x  text-white ">{status}</TableCell>
                <TableCell
                  onClick={() => setViewingCart(cart)}
                  className="w-[300px] cursor-pointer border-x text-white hover:bg-blue-200 hover:text-blue-600 "
                >
                  <p className="text-center font-medium text-blue-500 ">View Cart</p>
                </TableCell>
                <TableCell className="border-x text-white ">{customer}</TableCell>
                <TableCell className="border-x  text-white ">${total}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {viewingCart && <ViewCartModal setViewingCart={setViewingCart} cart={viewingCart} />}
    </div>
  )
}

export default OrderTable
