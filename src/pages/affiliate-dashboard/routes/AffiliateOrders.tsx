import { Button } from '../../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import AffiliateOrderTable from '../components/AffiliateOrderTable'
import { useQuery } from '@tanstack/react-query'
import { baseUrl } from '../../../constants/baseUrl'

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

// const tabItems = [
//   {
//     title: 'All',
//     value: 'all',
//     component: <OrderTable orders={pending_orders} title="All Orders" />,
//   },
//   {
//     title: 'Completed',
//     value: 'completed',
//     component: <OrderTable orders={completed_orders} title="Completed Orders" />,
//   },
//   {
//     title: 'Pending',
//     value: 'pending',
//     component: <OrderTable orders={pending_orders} title="Pending Orders" />,
//   },
//   {
//     title: 'Cancelled',
//     value: 'cancelled',
//     component: <OrderTable orders={pending_orders} title="Cancelled Orders" />,
//   },
// ]

function AffiliateOrders() {
  async function fetchOrders() {
    const _id = localStorage.getItem('_id')
    const res = await fetch(`${baseUrl}/affiliates/get-affiliate-orders?afilliate_id=${_id}`)
    const data = await res.json()
    console.log(data)
    return data
  }
  const { isLoading, data: orders } = useQuery({ queryKey: ['affiliate_orders'], queryFn: fetchOrders })

  if (isLoading) {
    return null
  }

  return (
    <div className="w-full p-4">
      <Tabs defaultValue="all" className="">
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
          <TabsTrigger className="w-[100px]" value="cancelled">
            Cancelled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AffiliateOrderTable title="" orders={isLoading ? [] : orders} />
        </TabsContent>
        <TabsContent value="pending">
          <AffiliateOrderTable title="" orders={[]} />
        </TabsContent>
        <TabsContent value="completed">
          <AffiliateOrderTable title="" orders={[]} />
        </TabsContent>
        <TabsContent value="cancelled">
          <AffiliateOrderTable title="" orders={[]} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AffiliateOrders
