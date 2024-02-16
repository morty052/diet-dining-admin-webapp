import { Button } from 'src/components/ui/button'
import OrderTable from './OrderTable'
import { TabsBuilder as Tabs, TabsBuilder } from 'src/components'

type Props = {}

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

const pending_orders = [
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

const completed_orders = [
  {
    store: 'Papa johns',
    status: 'COMPLETED',
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
  {
    store: 'Dominoes',
    status: 'COMPLETED',
    _id: '',
    cart: [
      {
        name: 'Pizza',
        price: '20',
        quantity: '1',
        item_id: '848grgrgrv777',
        extras: [],
      },
      {
        name: 'ice cream',
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

const tabItems = [
  {
    title: 'All',
    value: 'all',
    component: <OrderTable orders={pending_orders} title="All Orders" />,
  },
  {
    title: 'Completed',
    value: 'completed',
    component: <OrderTable orders={completed_orders} title="Completed Orders" />,
  },
  {
    title: 'Pending',
    value: 'pending',
    component: <OrderTable orders={pending_orders} title="Pending Orders" />,
  },
  {
    title: 'Cancelled',
    value: 'cancelled',
    component: <OrderTable orders={pending_orders} title="Cancelled Orders" />,
  },
]

function Orders({}: Props) {
  return (
    <div className="w-full p-4">
      <TabsBuilder defaultValue={tabItems?.[0].value} tabItems={tabItems} />
      {/* <OrderTable /> */}
    </div>
  )
}

export default Orders
