import { Lightbulb, Search } from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

interface IStore {
  store_name: string
  store_image: string
  store_description: string
  store_address: string
  store_logo: string
  store_orders: any
  store_status: any
}

type Props = {
  stores: IStore[]
  title: string
}

function SearchBar(params: type) {
  return (
    <search className=" flex items-center rounded-lg border p-2 ">
      <Search size={20} color="white" />
      <input className="w-72 bg-transparent focus:outline-none " placeholder="Search" type="text" name="" id="" />
    </search>
  )
}

export function StoreTable({ stores, title }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between gap-x-1 pb-6 pt-2">
        <div className="flex items-center gap-x-2 pt-2">
          <Lightbulb size={20} color="gold" />
          <p className="text-sm text-white">Click on a store to see extra options</p>
        </div>
        <SearchBar />
      </div>
      <Table>
        <TableCaption>{title}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" border-x border-t text-center text-white">Name</TableHead>
            <TableHead className="border-x border-t text-center text-white">Logo</TableHead>
            <TableHead className=" border-x border-t text-center text-white">Address</TableHead>
            <TableHead className="border-x border-t text-center text-white">Menu</TableHead>
            <TableHead className="border-x border-t text-center text-white">Status</TableHead>
            <TableHead className="border-x border-t text-center text-white">Orders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" divide-y">
          {stores?.map((store) => (
            <TableRow key={store.store_name} className="">
              <TableCell className="  border-x text-center text-white">{store.store_name}</TableCell>
              <TableCell className=" border-x text-center text-white">
                <div className="mx-auto h-14 w-14">
                  <img className="w-full object-contain" src={store.store_logo} alt="" />
                </div>
              </TableCell>
              <TableCell className="border-x   text-center text-white">${store.store_address}</TableCell>
              <TableCell className=" cursor-pointer border-x text-center font-medium text-blue-700 hover:bg-blue-400 hover:text-white">
                View Menu
              </TableCell>
              <TableCell className=" border-x text-center text-white">Approved</TableCell>
              <TableCell className=" cursor-pointer border-x text-center font-medium text-blue-700 hover:bg-blue-400 hover:text-white">
                View Orders
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
