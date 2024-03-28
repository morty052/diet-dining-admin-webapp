import { CalendarIcon, Clock, MapPin, Search, Send, Store, Users } from 'lucide-react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { NotificationsTemplateDropDown } from '../components/NotificationsTemplateDropdown'
import EmojiPicker from 'emoji-picker-react'
import { autoComplete } from '../../../lib/autoComplete'
import { Calendar } from '../../../components/ui/calendar'
import { baseUrl } from '../../../constants/baseUrl'

type TnotificationModes = 'BROADCAST' | 'SCHEDULE'
type TnotificationTypes = 'ALL' | 'AFFILIATES' | 'ZONAL'

type suggestions = {
  address: string
  placeId: string
  city: string
  state: string
  country: string
}

function Sidebar() {
  const [params, setParams] = useSearchParams()
  return (
    <div className="sticky bottom-0 top-0 w-48 border-r border-t border-white/20 p-2 ">
      <div className="border-b border-white/20 pb-2">
        <p className="text-white">Channels</p>
      </div>
      <div className=" border-b py-2">
        <div
          onClick={() => setParams({ CHANNEL: 'ALL', MODE: 'BROADCAST' })}
          className="flex  cursor-pointer items-center gap-x-2 rounded-lg p-2 hover:bg-white/20"
        >
          <Send className="h-4 w-4" color="white" />
          <p className="text-white">Broadcast</p>
        </div>
        <div
          onClick={() => setParams({ CHANNEL: 'ALL', MODE: 'BROADCAST' })}
          className="group flex cursor-pointer gap-x-2 rounded-lg p-2 hover:bg-white/20"
        >
          <Users className="h-4 w-4 text-gray-100/80 group-hover:text-green-400 " />
          <p className="text-sm text-white group-hover:text-green-400">All</p>
        </div>
        <div
          onClick={() => setParams({ CHANNEL: 'ZONAL', MODE: 'BROADCAST' })}
          className="group  flex cursor-pointer gap-x-2 rounded-lg p-2 hover:bg-white/20"
        >
          <MapPin className="h-4 w-4 text-gray-100/80 group-hover:text-green-400 " />
          <p className="text-sm text-white group-hover:text-green-400">Zonal</p>
        </div>
        <div
          onClick={() => setParams({ CHANNEL: 'AFFILIATES', MODE: 'BROADCAST' })}
          className="group  flex cursor-pointer gap-x-2 rounded-lg p-2 hover:bg-white/20"
        >
          <Store className="h-4 w-4 text-gray-100/80 group-hover:text-green-400 " />
          <p className="text-sm text-white group-hover:text-green-400">Affiliates</p>
        </div>
      </div>

      {/*SCHEDULE  */}
      <div className=" border-b py-2">
        <div
          onClick={() => setParams({ CHANNEL: 'ALL', MODE: 'SCHEDULE' })}
          className="flex cursor-pointer items-center gap-x-2 rounded-lg p-2 hover:bg-white/20"
        >
          <Clock className="h-4 w-4" color="white" />
          <p className="text-white">Schedule</p>
        </div>
        <div
          onClick={() => setParams({ CHANNEL: 'ALL', MODE: 'SCHEDULE' })}
          className="group  flex cursor-pointer gap-x-2 rounded-lg p-2 hover:bg-white/20"
        >
          <Users className="h-4 w-4 text-gray-100/80 group-hover:text-green-400 " />
          <p className="text-sm text-white group-hover:text-green-400">All</p>
        </div>
        <div
          onClick={() => setParams({ CHANNEL: 'ZONAL', MODE: 'SCHEDULE' })}
          className="group  flex cursor-pointer gap-x-2 rounded-lg p-2 hover:bg-white/20"
        >
          <MapPin className="h-4 w-4 text-gray-100/80 group-hover:text-green-400 " />
          <p className="text-sm text-white group-hover:text-green-400">Zonal</p>
        </div>
        <div
          onClick={() => setParams({ CHANNEL: 'AFFILIATES', MODE: 'SCHEDULE' })}
          className="group  flex cursor-pointer gap-x-2 rounded-lg p-2 hover:bg-white/20"
        >
          <Store className="h-4 w-4 text-gray-100/80 group-hover:text-green-400 " />
          <p className="text-sm text-white group-hover:text-green-400">Affiliates</p>
        </div>
      </div>
    </div>
  )
}

function NotificationItem() {
  return (
    <div className="space-y-2 rounded-lg border border-white/20 p-4 hover:bg-white/10 ">
      <div className="flex justify-between">
        <p className="text-light">Title</p>
        <p className="text-sm text-light">Time sent</p>
      </div>
      <p className="text-sm text-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates culpa qui molestiae reiciendis et ullam eum
        vero quibusdam. Provident nemo inventore quasi, laudantium esse repudiandae similique dolorum dolorem iste
        adipisci!
      </p>
    </div>
  )
}

function NotificationModeDisplay({ mode, channel }: { mode: TnotificationModes; channel: TnotificationTypes }) {
  const [suggestions, setSuggestions] = React.useState<suggestions[] | null>(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)
  const [day, setDay] = React.useState()

  let modeText
  const channelText = channel.toLowerCase()
  const isZonal = channel == 'ZONAL'
  const isSchedule = mode == 'SCHEDULE'

  async function handleAutoComplete(text: string) {
    setSearchQuery(text)
    if (text.length <= 0) {
      setSuggestions(null)
    }
    if (text.length > 4) {
      const data = await autoComplete(text)
      setSuggestions(data)
    }
  }
  switch (mode) {
    case 'BROADCAST':
      modeText = 'Broadcast'
      break
    case 'SCHEDULE':
      modeText = 'Schedule'
      break
    default:
      modeText = 'Broadcast'
      break
  }

  return (
    <div className="flex items-center justify-between gap-x-8 py-2">
      {isZonal && (
        <div className="relative w-full ">
          <input
            onBlur={() => setTimeout(() => setSuggestions(null), 200)}
            value={searchQuery}
            onChange={(e) => handleAutoComplete(e.target.value)}
            className=" h-8 w-full px-2"
            type="text"
          />
          {suggestions && (
            <div className="absolute top-12 z-10 w-full space-y-2 rounded-lg bg-white p-2">
              {suggestions.map((suggestion, index) => (
                <p
                  onClick={() => {
                    setSearchQuery(`${suggestion.address}, ${suggestion.city}, ${suggestion.state}`)
                    setSuggestions(null)
                  }}
                  className="cursor-pointer text-sm text-gray-500 hover:text-dark"
                  key={index}
                >
                  {suggestion.address}, {suggestion.city}, {suggestion.state}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {isSchedule && (
        <div className="relative w-full ">
          <CalendarIcon onClick={() => setDatePickerOpen(!datePickerOpen)} className="cursor-pointer text-white" />
          {datePickerOpen && (
            <div className="absolute top-8">
              <Calendar selected={day} className="bg-white" />
            </div>
          )}
        </div>
      )}
      <div className="rouded-lg inline-flex w-40 items-center justify-center rounded-lg border border-green-400/70 p-2 ">
        <p className="text-sm text-white">{modeText}</p>
        <p className="text-sm text-white">-</p>
        <span className="text-sm text-white first-letter:uppercase">{channelText}</span>
      </div>
    </div>
  )
}

function Notifications() {
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')
  const [type, setType] = React.useState<TnotificationModes>('BROADCAST')
  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false)
  const [bodyEmojiPickerOpen, setBodyEmojiPickerOpen] = React.useState(false)

  const [searchQuery, setSearchQuery] = React.useState('')
  const [suggestions, setSuggestions] = React.useState<suggestions[] | null>(null)

  async function handleAutoComplete(text: string) {
    setSearchQuery(text)
    if (text.length <= 0) {
      setSuggestions(null)
    }
    if (text.length > 4) {
      const data = await autoComplete(text)
      setSuggestions(data)
    }
  }

  const [params, setParams] = useSearchParams({
    MODE: 'BROADCAST',
    CHANNEL: 'ALL',
  })

  const MODE = params.get('MODE')
  const CHANNEL = params.get('CHANNEL')

  async function HandleSend() {
    try {
      if (!title || !body) {
        alert('Notification title and body cant be empty')
        return
      }

      const message = {
        // to: expoPushToken,
        sound: 'default',
        title,
        body,
        data: { someData: 'goes here' },
        type,
      }

      console.log(message)

      if (MODE == 'BROADCAST') {
        console.log('broadcast')
        const url = `${baseUrl}/utils/notifications/broadcast`
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        })
        const data = await res.json()
        console.log(data)
        setTitle('')
        setBody('')
        return
      }

      if (MODE == 'SCHEDULE') {
        console.log('schedule')
        alert('Scheduling not implemented yet')
        return
        const url = `http://localhost:3000/utils/notifications/schedule`
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        })
        const data = await res.json()
        console.log(data)
        setTitle('')
        setBody('')
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      onClick={() => {
        setEmojiPickerOpen(false)
        setBodyEmojiPickerOpen(false)
      }}
      className=" bg-darkGrey pt-8"
    >
      <div className=" relative  mx-auto flex  h-screen max-w-7xl  ">
        <Sidebar />
        {/* LEFT SIDE */}
        <div className="flex-1 overflow-y-scroll border-t border-white/20 ">
          {/* HEADER */}
          <div className="relative flex w-full items-center justify-between border-b border-white/10 p-2 md:px-6">
            <p className=" text-xl font-semibold text-light">New Notification</p>
            <NotificationsTemplateDropDown setTitle={(title) => setTitle(title)} setBody={(body) => setBody(body)} />
          </div>

          {/* CONTAINER */}
          <div className="space-y-4 px-2 py-4 md:px-6 ">
            {/* TITLE INPUT CONTAINER */}
            <div className="flex flex-col">
              <label className="text-white" htmlFor="">
                Title
              </label>

              <div className="relative ">
                <div className=" flex h-10 items-center rounded-lg border border-white/20 bg-transparent p-2 pr-8 text-light focus:border-green-300/50 focus:outline-none">
                  <input
                    className="w-full flex-1 bg-transparent focus:outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                  />
                  {/* EMOJI BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setEmojiPickerOpen(!emojiPickerOpen)
                    }}
                    className="absolute right-2 top-2 border-red-300 active:outline-none"
                  >
                    <span className="cursor-pointer text-lg">😃</span>
                  </button>
                </div>

                {/* EMOJI CONTAINER */}
                <div onClick={(e) => e.stopPropagation()} className="absolute top-12">
                  <EmojiPicker
                    // @ts-ignore

                    onEmojiClick={(emoji) => setTitle((prev) => prev + ` ${emoji.emoji}`)}
                    open={emojiPickerOpen}
                  />
                </div>
              </div>
            </div>
            {/* BODY INPUT CONTAINER */}
            <div className=" flex flex-col">
              <label className="mb-1 text-white" htmlFor="">
                Notification Body
              </label>
              <div className="relative ">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  className=" w-full rounded-lg border border-white/20 bg-transparent p-2 pr-8 text-sm text-light focus:border-green-300/50 focus:outline-none"
                />
                {/* BODY EMOJI BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setBodyEmojiPickerOpen(!bodyEmojiPickerOpen)
                  }}
                  className="absolute bottom-2 right-2 border-red-300 active:outline-none"
                >
                  <span className="cursor-pointer text-lg">😃</span>
                </button>
                {/*BODY EMOJI CONTAINER */}
                <div onClick={(e) => e.stopPropagation()} className="absolute ">
                  <EmojiPicker
                    // @ts-ignore
                    height={300}
                    onEmojiClick={(emoji) => setBody((prev) => prev + ` ${emoji.emoji}`)}
                    open={bodyEmojiPickerOpen}
                  />
                </div>
              </div>
              <NotificationModeDisplay channel={CHANNEL as any} mode={MODE as any} />
            </div>
            <Button onClick={HandleSend}>
              <span>Send Notification</span>
            </Button>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="hidden w-2/5 border-l border-l-white/20 lg:block ">
          {/* HEADER */}
          <div className="w-full border border-white/10 p-2 md:px-6">
            <p className=" text-xl font-semibold text-light">Sent</p>
          </div>
          {/* INNER CONTAINER */}
          <div className="space-y-4 p-2 md:px-6">
            {/* SEARCHBAR */}
            <div className="flex items-center gap-x-2 rounded-lg border border-white/10 p-2">
              <label htmlFor="search">
                <Search className="h-5 w-5" color="rgba(255 255 255 / 0.1)" />
              </label>
              <input
                id="search"
                placeholder="Search"
                className="w-full bg-transparent text-light  focus:outline-none "
                type="text"
              />
            </div>
            <NotificationItem />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
