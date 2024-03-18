import { UploadBody } from '@sanity/client'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Button } from 'src/components/ui/button'

function ImageInput({
  onClick,
  title,
  handlePrev,
  header,
  logo,
}: {
  onClick: (image: UploadBody, preview: string) => void
  title: string
  handlePrev: () => void
  header?: boolean
  logo?: boolean
}) {
  const [imageFile, setImageFile] = React.useState('')
  const [uploadable, setUploadable] = React.useState<UploadBody>()
  const [error, setError] = React.useState(false)

  function handleFileChange(e: any) {
    console.log(e.target.files[0])
    setUploadable(e.target.files[0])
    setImageFile(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className="grid   gap-y-8 ">
      <div className="text-center">
        <p className="text-2xl font-medium text-white">{title}</p>
        <p className="text-white">Upload an image to use as your {header ? 'Header' : 'Logo'}</p>
      </div>
      <div className="flex flex-col items-center gap-y-4">
        {/* // * APPLY PLACEHOLDER STYLE CONDITIONALLY */}
        {!imageFile && (
          <label
            onClick={() => {
              if (error) {
                setError(false)
              }
            }}
            htmlFor="image"
            className={`flex cursor-pointer items-center justify-center border ${header && 'h-40 w-full border'} ${
              logo && 'h-28 w-28 rounded-full border '
            } `}
          >
            <input
              id="image"
              onChange={(e) => handleFileChange(e)}
              className="hidden border bg-transparent text-white"
              type="file"
            />
            {
              <span className={'text-blue-600'}>
                {header && 'Click to upload Image'}
                {logo && 'Upload logo'}
              </span>
            }
          </label>
        )}

        {/* // * APPLY IMAGE STYLE CONDITIONALLY */}
        {imageFile && (
          <div className={`${header && 'h-40 w-full border'} ${logo && 'h-28 w-28 rounded-full border '}`}>
            {header && <img className={' h-full w-full object-cover'} src={imageFile} alt="" />}
            {logo && <img className={'h-28 w-28 rounded-full  object-cover'} src={imageFile} alt="" />}
          </div>
        )}
        {error && <p className="text-sm text-red-500">Please upload image to continue</p>}
      </div>
      <div className="flex w-full justify-between  pt-8">
        <Button onClick={() => handlePrev()} className="bg-white text-black">
          <ArrowLeft />
        </Button>
        <Button
          onClick={() => {
            if (!imageFile) {
              setError(true)
              return
            }
            onClick(uploadable as UploadBody, imageFile)
            // setImageFile('')
          }}
          className="w-48 bg-white text-black"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default ImageInput
