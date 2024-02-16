import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

interface IStore {
  name: string
  image: string
  description: string
  address: string
  logo: string
  orders: any
  status: any
}

type Props = {
  stores: IStore[]
}

export function StoreTable({ stores }: Props) {
  return (
    <div>
      <Table>
        <TableCaption>Manage stores.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] text-white">Name</TableHead>
            <TableHead className="w-[150px] text-white">Image</TableHead>
            <TableHead className=" text-white">Description</TableHead>
            <TableHead className="text-right text-white">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" divide-y">
          {stores?.map((store) => (
            <TableRow key={store.name} className="">
              <TableCell className=" w-[200px] text-white">{store.name}</TableCell>
              <TableCell className="w-[150px] text-white">{store.image}</TableCell>
              <TableCell className=" w-[400px] text-white">{store.description}</TableCell>
              <TableCell className="pr-8 text-right text-white">${store.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
