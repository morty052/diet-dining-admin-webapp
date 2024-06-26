import { ArrowRightCircle } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useNewAffiliate } from '../../../models/newAffiliate'
import Controlbuttons from '../components/ControlButtons'
import ProgressBar from '../components/ProgressBar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog'
import React from 'react'
import { toast } from '../../../components/ui/use-toast'
import { baseUrl } from '../../../constants/baseUrl'

const EmailConfirmationPopup = ({
  loading,
  setLoading,
  handleSendEmail,
  trigger,
}: {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  handleSendEmail: () => void
  trigger: React.RefObject<HTMLButtonElement>
}) => {
  return (
    <AlertDialog>
      {!loading && (
        <AlertDialogTrigger ref={trigger}>
          <p className="cursor-pointer text-center text-xl  font-semibold text-gray-100 transition-all duration-300 ease-in hover:text-green-400">
            Add to database
          </p>
        </AlertDialogTrigger>
      )}
      {loading && (
        <p className="animate-pulse cursor-pointer text-center text-xl  font-semibold text-gray-100 transition-all  ease-in hover:text-green-400">
          Adding to database...
        </p>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send Onboarding email ?</AlertDialogTitle>
          <AlertDialogDescription>
            Clicking confirm will add vendor to database and send an onboarding email to the new vendor{' '}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSendEmail}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function CreateStoreScreen() {
  const { createStore, affiliate, createAffiliate } = useNewAffiliate()
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(false)

  const [params, setParams] = useSearchParams()

  const { store_image, email } = affiliate

  const navigate = useNavigate()
  const popUpButtonRef = React.useRef<HTMLButtonElement>(null)

  async function handleSendEmail({ username, code }: { username: string; code: string }) {
    const url = `${baseUrl}/send-email?username=${username}&code=${code}&to=${email}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
  }

  async function handleCreateStore() {
    setLoading(true)
    // * CREATE AFFILIATE
    const data = await createAffiliate()
    // * GET CODE AS ID FROM CREATING AFFILIATE
    const { _id, status } = data
    const { _id: store_id } = await createStore(_id as string)
    // * SEND EMAIL TO NEW AFFILIATE WITH CODE
    await handleSendEmail({ username: affiliate.store_name, code: store_id as string })
    setParams({ store_id: store_id as string })
    setLoading(false)
    setDone(true)
    toast({
      title: 'Added to database.',
      description: 'An onboarding email has been sent to the new vendor',
      // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    })

    return store_id
    // navigate(`/store-preview/${store_id}`)
  }

  async function handleFinish() {
    popUpButtonRef.current?.click()
  }

  async function handlePreviewStore() {
    navigate(`/store-preview/${params.get('store_id')}`, { replace: true })
  }

  return (
    <div className="flex w-full flex-col gap-y-4  pt-28 ">
      <div className="flex flex-col items-center py-2">
        {/* <p className="cursor-pointer text-center text-2xl font-semibold text-gray-100 transition-all duration-300 ease-in hover:text-green-400">
          Add to database
        </p> */}
        {!done && (
          <>
            <EmailConfirmationPopup
              trigger={popUpButtonRef}
              handleSendEmail={() => handleCreateStore()}
              loading={loading}
              setLoading={setLoading}
            />
            <p className="text-center text-sm text-gray-400">
              Created store will stay in preview only mode until approved.
            </p>
            {/* <div className="flex w-full items-center gap-x-2">
              <div className="h-1 flex-1 border"></div>
              <p className="text-white">OR</p>
              <div className="h-1 flex-1 border"></div>
            </div> */}
          </>
        )}
        {done && (
          <>
            <p className=" text-center text-xl font-semibold text-gray-100 ">Added to database</p>
            <p className="text-center text-sm text-gray-400">
              Created store will stay in preview only mode until approved.
            </p>
            {/* <div className="flex w-full items-center gap-x-2">
              <div className="h-1 flex-1 border"></div>
              <p className="text-white">OR</p>
              <div className="h-1 flex-1 border"></div>
            </div> */}
          </>
        )}
      </div>
      {/* PREVIEW BUTTON */}
      {done && (
        <div onClick={() => handlePreviewStore()} className="group flex items-center justify-center gap-x-2">
          <p className="cursor-pointer  text-lg font-medium text-white hover:text-green-400">
            Preview on companion app
          </p>
          <ArrowRightCircle className="mt-1 h-5 w-5 text-white transition-all duration-300 ease-in group-hover:translate-x-2 group-hover:text-green-400" />
        </div>
      )}
      <Controlbuttons finished={done} title="Finish" onClick={() => handleFinish()} />
      <div className=" max-w-7xl pt-12 ">
        <div className="flex items-center gap-x-2">
          <p className="fontmedium text-sm text-white">
            Step {5} of {5}
          </p>
          <ProgressBar progress={5 * 20} />
        </div>
      </div>
    </div>
  )
}

export default CreateStoreScreen
