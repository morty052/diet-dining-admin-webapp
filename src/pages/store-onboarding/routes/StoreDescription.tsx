import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useNewAffiliate } from '../../../models/newAffiliate'
import Controlbuttons from '../components/ControlButtons'
import ProgressBar from '../components/ProgressBar'

function StoreDescription() {
  const [storeDescription, setStoreDescription] = React.useState('')
  const [error, setError] = React.useState(false)

  const { setDescription, affiliate } = useNewAffiliate()

  const navigate = useNavigate()

  function handleConfirmDescription() {
    if (!storeDescription) {
      setError(true)
      return
    }
    setDescription(storeDescription)
    console.log(storeDescription)
    navigate('/store-onboarding/image')
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: 'easeIn' }}
      className="grid gap-y-6 py-16 sm:px-4"
    >
      <div className="">
        <p className="text-2xl font-semibold text-white">Vendor Description</p>
        <p className="text-white">Write a short description of the vendor</p>
      </div>
      <div className="">
        <textarea
          value={storeDescription}
          onFocus={() => {
            if (error) {
              setError(false)
            }
          }}
          placeholder="Vendor Description"
          rows={6}
          onChange={(e) => setStoreDescription(e.target.value)}
          className={`w-full rounded-lg border bg-transparent p-2 text-white focus:border-0 focus:outline-green-400 ${
            error && 'border-red-500'
          }`}
        />
        {error && <p className="text-sm text-red-500">Please enter description to continue</p>}
      </div>
      <Controlbuttons onClick={handleConfirmDescription} />
      {/* STEPS LEFT */}
      <div className=" max-w-7xl  pt-6">
        <div className="flex items-center gap-x-2">
          <p className="fontmedium text-sm text-white">
            Step {2} of {4}
          </p>
          <ProgressBar progress={2 * 20} />
        </div>
      </div>
    </motion.div>
  )
}

export default StoreDescription
