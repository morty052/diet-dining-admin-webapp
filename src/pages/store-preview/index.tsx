import { useNavigate, useParams } from 'react-router-dom'
import { useSocketContext } from '../../contexts/SocketContext'
import React from 'react'
import { useNewAffiliate } from '../../models/newAffiliate'
// import { useNewAffiliate } from '../../models/newAffiliate'
import { ArrowLeft } from 'lucide-react'
import { StoreNameEditMode } from '../store-onboarding/routes/StoreName'

function PhoneMockUp({ synced }: { synced: boolean }) {
  const { addTag, affiliate, removeTag } = useNewAffiliate()

  const { tags } = affiliate

  console.log(tags)
  return (
    <div className={` mx-auto h-[580px] w-[300px] rounded-3xl border  ${!synced && ''}`}>
      {!synced && (
        <>
          <div className="mx-auto mt-2 h-[25px] w-24 rounded-full border"></div>
          <div className="flex h-full w-full items-center justify-center pb-40">
            <p className="animate-pulse text-white">{!synced ? 'Waiting for connection...' : 'Connected'}</p>
          </div>
        </>
      )}
      {synced && (
        <>
          <div className="mx-auto mt-2 h-[25px] w-24 rounded-full border"></div>
          <div className="flex h-full w-full items-center justify-center pb-40">
            <p className="text-green-400">Connected</p>
          </div>
        </>
      )}
    </div>
  )
}

export function StorePreview() {
  //   const { createAffiliate } = useNewAffiliate()
  const [loading, setLoading] = React.useState(true)
  const [synced, setSynced] = React.useState(false)
  const [store, setStore] = React.useState(null)
  const [activeSection, setActiveSection] = React.useState('Name')

  const [storePreview, setStorePreview] = React.useState({
    store_name: '',
    tag: '',
  })
  const { id: previewstore_id } = useParams()
  const { socket } = useSocketContext()
  const navigate = useNavigate()

  React.useEffect(() => {
    const _id = localStorage.getItem('_id')
    socket?.emit('connect_admin', { previewstore_id, admin_id: _id }, async () => {
      console.log('connected')
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  React.useEffect(() => {
    socket?.on('synced', (data) => {
      setSynced(true)
      setStore(data[0])
    })
  }, [socket])

  const handleSync = () => {
    const _id = localStorage.getItem('_id')
    socket?.emit('connect_companion', { _id }, () => {
      console.log('synced')
    })
  }

  // if (loading) {
  //   return null
  // }

  if (!synced) {
    return (
      <div className="mx-auto max-w-7xl ">
        <div className="grid h-screen gap-x-8 divide-x   md:grid-cols-2 md:px-6">
          <div className="relative grid place-content-center px-2 pb-40">
            <div className="mb-6 ">
              <p onClick={handleSync} className="  font-medium text-gray-50">
                Follow steps below to preview store
              </p>
              {/* <p className="  animate-pulse text-sm font-medium text-gray-50">Waiting for connection...</p> */}
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-x-2">
                <div className="grid h-8 w-8 place-content-center rounded-full border">
                  <p className="text-white">1</p>
                </div>
                <p className=" text-xl font-medium text-white">Open companion app</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="grid h-8 w-8 place-content-center rounded-full border">
                  <p className="text-white">2</p>
                </div>
                <p className=" text-xl font-medium text-white">Tap preview</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="grid h-8 w-8 place-content-center rounded-full border">
                  <p className="text-white">3</p>
                </div>
                <p className="text-xl font-medium text-white">Tap sync button</p>
              </div>
            </div>

            {/* BACK BUTTON */}
            <div
              onClick={() => navigate(-1)}
              className="group absolute left-2 top-2 flex cursor-pointer items-center gap-x-2 "
            >
              <ArrowLeft className="text-white transition-all duration-300 ease-in group-hover:text-green-400" />
              <p className="text-white transition-all duration-300 ease-in group-hover:text-green-400">Exit Preview</p>
            </div>
          </div>
          <div className="hidden place-content-center  p-2 md:grid">
            <PhoneMockUp synced={synced} />
          </div>
        </div>
      </div>
    )
  }

  const { store_name, store_image, store_id } = store ?? {}

  function sendStoreName() {
    socket?.emit('send_store_name', { store_name: storePreview.store_name, _id: id })
  }
  function sendStoreTag() {
    socket?.emit('send_store_tag', { tag: storePreview.tag, _id: id })
  }

  function SectionButton({ title, setActiveSection }) {
    function handleClick(params: type) {
      setActiveSection(title)
    }

    return (
      <button onClick={handleClick}>
        <p className="text-white">{title}</p>
      </button>
    )
  }

  const Sections = {
    Name: <StoreNameEditMode previewName={store_name} />,
    Logo: null,
    Header: null,
    Description: null,
    Address: null,
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid h-screen gap-x-8 divide-x   md:grid-cols-2 md:px-6">
        {/* <div className="">
          <p className=" text-2xl font-semibold text-gray-100">synced {store_name}</p>
          <div className="flex">
            <input
              value={storePreview.store_name}
              onChange={(e) =>
                setStorePreview((prev) => ({
                  ...prev,
                  store_name: e.target.value,
                }))
              }
              type="text"
            />
            <Button onClick={sendStoreName}>Press me</Button>
          </div>
          <div className="flex">
            <input
              value={storePreview.tag}
              onChange={(e) =>
                setStorePreview((prev) => ({
                  ...prev,
                  tag: e.target.value,
                }))
              }
              type="text"
            />
            <Button onClick={sendStoreTag}>Send Tag</Button>
          </div>
        </div> */}
        <div className="flex flex-col">
          <div className="flex max-w-sm justify-between  pt-8">
            <SectionButton setActiveSection={setActiveSection} title={'Name'} />
            <SectionButton setActiveSection={setActiveSection} title={'Logo'} />
            <SectionButton setActiveSection={setActiveSection} title={'Header'} />
            <SectionButton setActiveSection={setActiveSection} title={'Description'} />
            <SectionButton setActiveSection={setActiveSection} title={'Address'} />
          </div>
          <div className="flex flex-1 flex-col justify-center">{Sections[activeSection as keyof typeof Sections]}</div>
        </div>
        <div className="hidden place-content-center  p-2 md:grid">
          <PhoneMockUp synced={synced} />
        </div>
      </div>
    </div>
  )
}
