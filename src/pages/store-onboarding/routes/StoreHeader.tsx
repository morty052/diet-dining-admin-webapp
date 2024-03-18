import { UploadBody } from '@sanity/client'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { sanityClient } from 'src/lib/sanityClient'
import { useNewAffiliate } from 'src/models/newAffiliate'
import ImageInput from '../components/ImageInput'
import ProgressBar from '../components/ProgressBar'

function StoreHeader() {
  const { setHeader } = useNewAffiliate()

  const navigate = useNavigate()

  // TODO FIX ERROR HANDLING
  async function handleStoreHeader(header: UploadBody, preview: string) {
    try {
      navigate('/store-onboarding/logo')
      console.log(header)
      const { _id } = await sanityClient.assets.upload('image', header)
      setHeader(_id, preview)
      console.log(_id)
    } catch (error) {
      const _id = '2'
      setHeader(_id, preview)
    }
  }

  return (
    <motion.div className=" py-8 sm:px-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ease: 'easeIn' }}>
      <ImageInput
        header
        handlePrev={() => navigate(-1)}
        title="Upload Store Header"
        onClick={(header, preview) => handleStoreHeader(header, preview)}
      />

      {/* NEXT STEPS */}
      <div className=" max-w-7xl  pt-6">
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

export default StoreHeader
