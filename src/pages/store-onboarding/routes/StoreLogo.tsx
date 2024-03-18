import { UploadBody } from '@sanity/client'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { sanityClient } from 'src/lib/sanityClient'
import { useNewAffiliate } from 'src/models/newAffiliate'
import ProgressBar from '../components/ProgressBar'
import ImageInput from '../components/ImageInput'
import { useState } from 'react'

function StoreLogo() {
  const { setLogo } = useNewAffiliate()
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  // TODO FIX ERROR HANDLING
  async function handleStoreLogo(logo: UploadBody, preview: string) {
    if (!logo) {
      setError(true)
      return
    }
    try {
      navigate('/store-onboarding/address')
      const { _id } = await sanityClient.assets.upload('image', logo)
      setLogo(_id, preview)
      console.log(_id)
    } catch (error) {
      const _id = 'vv'
      setLogo(_id, preview)
    }
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: 'easeIn' }}
      className="grid  gap-y-8 py-8 sm:px-4"
    >
      <div className="">
        <ImageInput
          logo
          handlePrev={() => navigate(-1)}
          title="Upload Store Logo"
          onClick={(logo, preview) => handleStoreLogo(logo, preview)}
        />
      </div>
      <div className=" max-w-7xl ">
        <div className="flex items-center gap-x-2">
          <p className="fontmedium text-sm text-white">
            Step {3} of {4}
          </p>
          <ProgressBar progress={3 * 20} />
        </div>
      </div>
    </motion.div>
  )
}

export default StoreLogo
