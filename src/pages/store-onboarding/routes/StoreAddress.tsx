import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useNewAffiliate } from '../../../models/newAffiliate'
import ProgressBar from '../components/ProgressBar'
import Controlbuttons from '../components/ControlButtons'
import { autoComplete } from '../../../lib/autoComplete'

type suggestions = {
  address: string
  placeId: string
  city: string
  state: string
  country: string
}

function StoreAddress() {
  const [storeAddress, setStoreAddress] = React.useState({
    street: '',
    city: '',
    province: '',
    postal_code: '',
  })
  const [searchQuery, setSearchQuery] = React.useState('')
  const [suggestions, setSuggestions] = React.useState<suggestions[] | null>(null)
  const navigate = useNavigate()

  const { setAddress } = useNewAffiliate()

  function handleConfirmAdress() {
    setAddress(storeAddress)
    navigate('/store-onboarding/tags')
  }

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

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: 'easeIn' }}
      className="grid gap-y-6 py-8 sm:px-4"
    >
      <div className="">
        <p className="text-2xl font-semibold text-white">Address Information</p>
        <p className="text-white">Enter Address information for vendor</p>
      </div>
      <div className="relative ">
        <input
          placeholder="Address Line 1"
          value={storeAddress.street}
          name="street"
          onChange={(e) => {
            setStoreAddress((prev) => ({
              ...prev,
              street: e.target.value,
            }))
            handleAutoComplete(e.target.value)
          }}
          type="text"
          className="w-full border-b bg-transparent py-2 text-lg text-white focus:border-green-400 focus:outline-none "
        />
        {suggestions && (
          <div className="absolute top-12 z-10 w-full space-y-2 rounded-lg bg-white p-2">
            {suggestions.map((suggestion, index) => (
              <p
                onClick={() => {
                  setStoreAddress({
                    street: suggestion.address,
                    city: suggestion.city,
                    province: suggestion.state,
                    postal_code: '',
                  })
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
      <input
        placeholder="City"
        value={storeAddress.city}
        name="city"
        onChange={(e) =>
          setStoreAddress((prev) => ({
            ...prev,
            city: e.target.value,
          }))
        }
        type="text"
        className="border-b bg-transparent py-2 text-lg text-white focus:border-green-400 focus:outline-none "
      />
      <input
        placeholder="Province"
        value={storeAddress.province}
        name="state"
        onChange={(e) =>
          setStoreAddress((prev) => ({
            ...prev,
            province: e.target.value,
          }))
        }
        type="text"
        className="border-b bg-transparent py-2 text-lg text-white focus:border-green-400 focus:outline-none "
      />
      <input
        placeholder="Post Code"
        value={storeAddress.postal_code}
        name="postal"
        onChange={(e) =>
          setStoreAddress((prev) => ({
            ...prev,
            postal_code: e.target.value,
          }))
        }
        type="text"
        className="border-b bg-transparent py-2 text-lg text-white focus:border-green-400 focus:outline-none "
      />
      <Controlbuttons onClick={handleConfirmAdress} />
      <div className=" max-w-7xl ">
        <div className="flex items-center gap-x-2">
          <p className="fontmedium text-sm text-white">
            Step {4} of {5}
          </p>
          <ProgressBar progress={4 * 20} />
        </div>
      </div>
    </motion.div>
  )
}

export default StoreAddress
