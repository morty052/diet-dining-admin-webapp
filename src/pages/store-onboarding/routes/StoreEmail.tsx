import { motion } from 'framer-motion'
import Controlbuttons from '../components/ControlButtons'
import ProgressBar from '../components/ProgressBar'
import { useNewAffiliate } from '../../../models/newAffiliate'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function StoreEmail() {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(false)
  const navigate = useNavigate()

  const { setAffiliateEmail } = useNewAffiliate()

  function handleConfirmemail() {
    if (email.includes('@dietdining.org')) {
      alert('You cant use emails associated with diet dining here please enter a different email')
      return
    }

    if (!email) {
      setError(true)
      return
    }
    setAffiliateEmail(email)
    console.log(email)
    navigate('name')
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: 'easeIn' }}
      className="grid gap-y-8 py-20 sm:px-4"
    >
      <div className="">
        <p className="text-2xl font-semibold text-white">Vendor Email</p>
        <p className="text-white">Please Enter a valid email for the vendor. </p>
      </div>
      <div className="">
        <input
          placeholder="Enter Vendor Email"
          value={email}
          onChange={(e) => {
            if (error) {
              setError(false)
            }
            setEmail(e.target.value)
          }}
          type="text"
          className={` w-full border-b-2 bg-transparent p-2 text-lg text-white focus:border-green-400 focus:outline-none ${
            error && 'border-red-500'
          }`}
        />
        {error && <p className="text-sm text-red-500">Please enter a valid email to continue</p>}
      </div>

      <Controlbuttons onClick={handleConfirmemail} />

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

export default StoreEmail
