import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import { Tcart } from '../../../types/cart'

type Props = {
  affiliates: any
}

// const orders = [
//   {
//     store: 'Papa johns',
//     status: 'PENDING',
//     _id: '',
//     cart: [
//       {
//         name: 'Food',
//         price: '20',
//         quantity: '1',
//         item_id: '848grgrgrv777',
//         extras: [],
//       },
//     ],
//     customer: 'anthonyChopra@mail.com',
//     total: '400',
//   },
// ]

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

const ViewCartModal = ({ cart, setViewingCart }: { cart: any; setViewingCart: any }) => {
  return (
    <div className="fixed inset-0   bg-black py-4">
      <div className="mx-auto w-2/4 rounded-lg bg-white p-2">
        <p onClick={() => setViewingCart(null)} className="text-xl font-medium text-black">
          Cart:
        </p>
        {cart?.map((cart: Tcart) => {
          const { name, price, quantity, _id, extras } = cart
          return (
            <div key={_id} className=" ">
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
function OrderUpdateDropdown({ pending, _id }: { pending: boolean; _id: string }) {
  const [newStatus, setNewStatus] = useState<'Pending' | 'Completed' | 'Cancelled' | null>(null)

  const handleUpdateStatus = async () => {
    let status = {
      completed: false,
      pending: true,
      cancelled: false,
    }
    switch (newStatus) {
      case 'Completed':
        status = {
          completed: true,
          pending: false,
          cancelled: false,
        }
        break
      case 'Cancelled':
        status = {
          completed: false,
          pending: false,
          cancelled: true,
        }
        break
      case 'Pending':
        status = {
          completed: false,
          pending: true,
          cancelled: false,
        }
        break

      default:
        break
    }

    const res = await fetch('http://localhost:3000/orders/update-status', {
      method: 'POST',
      body: JSON.stringify({ status, _id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return data
  }

  return (
    <TableCell className="flex items-center justify-between border-x  text-white ">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-1/2 items-center justify-between rounded-lg border px-4 py-2">
          {!newStatus && <p className="text-center">{pending ? 'Pending' : 'Completed'}</p>}
          {newStatus && <p className="text-center">{newStatus}</p>}
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuGroup>
          <DropdownMenuContent className="w-72 space-y-2 border-b bg-gray-200 shadow-md">
            <div className="bg-white p-2">
              <span className="text-sm">Select Option</span>
            </div>
            <DropdownMenuItem onClick={() => setNewStatus('Completed')} className="cursor-pointer border ">
              <p>Completed</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setNewStatus('Pending')} className="cursor-pointer border bg-gray-200">
              <p>Pending</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setNewStatus('Cancelled')} className="cursor-pointer border bg-gray-200">
              <p>Cancelled</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuGroup>
      </DropdownMenu>
      <button
        disabled={!newStatus}
        onClick={handleUpdateStatus}
        className="group group rounded-lg bg-white px-4 py-2 transition-all duration-300  ease-in hover:bg-green-400 hover:text-white disabled:bg-gray-600"
      >
        <span className="text-xs font-medium text-gray-800 ">Update</span>
      </button>
    </TableCell>
  )
}

function AffiliatesTable({ affiliates }: Props) {
  return (
    <div className="py-6">
      <div className="flex items-center justify-end px-2">
        <DownLoadReportButton />
      </div>
      <Table>
        <TableCaption>All affiliates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-white">Name</TableHead>
            <TableHead className=" text-center text-white">Logo</TableHead>
            <TableHead className=" text-center text-white">Orders</TableHead>
            <TableHead className=" text-center text-white">Inspect</TableHead>
            <TableHead className=" text-center text-white">Rating</TableHead>
          </TableRow>
        </TableHeader>
        {affiliates && affiliates.length > 0 && (
          <TableBody className="">
            {affiliates?.map((store: Taffiliate) => {
              const { store_name, store_logo, store_rating, store_orders } = store

              console.log(store)

              return (
                <TableRow key={store._id}>
                  {/* NAME*/}
                  <TableCell className="border-x text-center text-white ">{store_name}</TableCell>
                  {/* LOGO */}
                  <TableCell className="border-x text-center text-white ">
                    <img src={store_logo} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" />
                  </TableCell>
                  {/* ORDERS */}
                  <TableCell className=" w-1/5 max-w-sm  cursor-pointer border-x text-white hover:bg-blue-200 hover:text-blue-600 ">
                    <p className="text-center font-medium text-white ">
                      {store_orders?.length > 0 ? store_orders.length : 0}
                    </p>
                  </TableCell>
                  <TableCell className="border-x text-center text-white ">Tap to inspect</TableCell>
                  <TableCell className=" border-x text-center font-medium text-white">{store_rating}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        )}
      </Table>
    </div>
  )
}

export default AffiliatesTable
