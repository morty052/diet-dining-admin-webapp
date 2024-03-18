import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreTagsDropdown } from 'src/components/dropdowns/StoreTagsDropDown'
import { Button } from 'src/components/ui/button'
import { useNewAffiliate } from 'src/models/newAffiliate'
import Controlbuttons from '../components/ControlButtons'
import ProgressBar from '../components/ProgressBar'

function StoreTags() {
  const [tag, setTag] = React.useState('')
  const [error, setError] = React.useState(false)
  const [tagInputFocused, settagInputFocused] = React.useState(false)
  const navigate = useNavigate()

  const { addTag, affiliate, removeTag } = useNewAffiliate()

  const { tags } = affiliate

  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleConfirmAdress() {
    if (tags.length == 0) {
      setError(true)
      return
    }
    navigate('/store-onboarding/confirm')
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: 'easeIn' }}
      className="grid gap-y-6 py-8 sm:px-4"
    >
      <div className="">
        <p className="text-2xl font-semibold text-white">Add Vendor Tags</p>
        <p className="text-white">Example: Salads, Chinese, Soups </p>
      </div>
      <div className={`flex items-center border-b pb-1 ${tagInputFocused && 'border-green-400'} `}>
        <input
          ref={inputRef}
          onFocus={() => settagInputFocused(true)}
          onBlur={() => settagInputFocused(false)}
          placeholder="Tag"
          value={tag}
          name="street"
          onChange={(e) => setTag(e.target.value)}
          type="text"
          className="w-full  bg-transparent py-2 text-lg text-white focus:border-green-400 focus:outline-none "
        />
        <StoreTagsDropdown />
      </div>

      <div className="flex gap-x-2">
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <div onClick={() => removeTag(tag)} key={tag} className="">
              <span className="text-sm text-white hover:text-red-400">{tag}</span>
              {index != tags.length - 1 && <span className="text-white"> -</span>}
            </div>
          ))}
        {tags.length < 1 && <p className="text-sm text-gray-300">Tags will appear here as you add them</p>}
      </div>
      <Button
        onClick={() => {
          addTag(tag)
          setTag('')
          // setImageFile('')
        }}
        className="mb-10 w-28 bg-white text-black"
      >
        Add
      </Button>
      {error && <p className="text-sm text-red-500">Please enter at least one tag to continue</p>}
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

export default StoreTags
