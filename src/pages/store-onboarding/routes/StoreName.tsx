import { motion } from 'framer-motion'
import Controlbuttons from '../components/ControlButtons'
import ProgressBar from '../components/ProgressBar'
import { useNewAffiliate } from '../../../models/newAffiliate'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { Button } from '../../../components/ui/button'

function StoreName() {
  const [storeName, setStoreName] = React.useState('')
  const [error, setError] = React.useState(false)
  const navigate = useNavigate()

  const { setName } = useNewAffiliate()

  function handleConfirmStoreName() {
    if (!storeName) {
      setError(true)
      return
    }
    setName(storeName)
    console.log(storeName)
    navigate('/store-onboarding/description')
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: 'easeIn' }}
      className="grid gap-y-8 py-20 sm:px-4"
    >
      <div className="">
        <p className="text-2xl font-semibold text-white">Vendor Display Name</p>
        <p className="text-white">Please Enter a display name to show users. </p>
      </div>
      <div className="">
        <input
          placeholder="Enter Display Name"
          value={storeName}
          onChange={(e) => {
            if (error) {
              setError(false)
            }
            setStoreName(e.target.value)
          }}
          type="text"
          className={` w-full border-b-2 bg-transparent p-2 text-lg text-white focus:border-green-400 focus:outline-none ${
            error && 'border-red-500'
          }`}
        />
        {error && <p className="text-sm text-red-500">Please enter a valid name to continue</p>}
      </div>

      <Controlbuttons onClick={handleConfirmStoreName} />

      {/* STEPS LEFT */}
      <div className=" max-w-7xl  pt-6">
        <div className="flex items-center gap-x-2">
          <p className="fontmedium text-sm text-white">
            Step {1} of {4}
          </p>
          <ProgressBar progress={1 * 20} />
        </div>
      </div>
    </motion.div>
  )
}

export function StoreNameEditMode({ previewName }: { previewName: string }) {
  const [storeName, setStoreName] = React.useState('')
  const [error, setError] = React.useState(false)
  const navigate = useNavigate()

  const { setName } = useNewAffiliate()

  function handleConfirmStoreName() {
    if (!storeName) {
      setError(true)
      return
    }
    setName(storeName)
    console.log(storeName)
    navigate('/store-onboarding/description')
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: 'easeIn' }}
      className="flex flex-col justify-center gap-y-2  py-20 sm:px-4"
    >
      <div className="">
        <p className="text-2xl font-semibold text-white">Edit Display Name</p>
        <p className="text-white">Enter new display name to show users. </p>
      </div>
      <div className="">
        <input
          placeholder={previewName}
          value={storeName}
          onChange={(e) => {
            if (error) {
              setError(false)
            }
            setStoreName(e.target.value)
          }}
          type="text"
          className={` w-full border-b-2 bg-transparent p-2 text-lg text-white focus:border-green-400 focus:outline-none ${
            error && 'border-red-500'
          }`}
        />
        {error && <p className="text-sm text-red-500">Please enter a valid name to continue</p>}
      </div>
      <div className="flex justify-end pt-4">
        <Button onClick={() => console.log(storeName)} className="w-48 bg-white text-black">
          {'Update'}
        </Button>
      </div>
    </motion.div>
  )
}

export default StoreName
