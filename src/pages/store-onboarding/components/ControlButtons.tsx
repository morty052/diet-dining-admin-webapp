import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'

function Controlbuttons({ onClick, title, finished }: { onClick: () => void; title?: string; finished?: boolean }) {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between  pt-4">
      <Button onClick={() => navigate(-1)} className="bg-white text-black">
        <ArrowLeft />
      </Button>
      {!finished && (
        <Button
          onClick={() => {
            onClick()
            // setImageFile('')
          }}
          className="w-48 bg-white text-black"
        >
          {title ? title : 'Next'}
        </Button>
      )}
    </div>
  )
}

export default Controlbuttons
