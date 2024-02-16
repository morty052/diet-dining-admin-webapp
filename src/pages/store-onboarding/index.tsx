import { Header } from '../../components'
import testimage from '../../assets/ earthtree.png'

type Props = {}

function ChoiceBox({ title }: { title: string }) {
  return (
    <div className="group inline-flex w-28 cursor-pointer justify-center rounded-lg border p-2 transition-all duration-300 ease-in hover:bg-white">
      <p className="text-sm font-medium text-white group-hover:text-black ">{title}</p>
    </div>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className=" h-2 w-40 rounded-lg border">
      <div className={`w-[10%] rounded-lg  bg-orange-400`}></div>
    </div>
  )
}

function DefaultScreen(params: type) {
  return (
    <>
      <div className="mx-auto grid max-w-5xl grid-cols-1 justify-between border sm:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6 px-2 pb-20">
          <p className="text-3xl font-medium text-white">Select Entitty to Onboard</p>
          <div className="flex gap-x-4">
            <ChoiceBox title="Employee" />
            <ChoiceBox title="Affiliate" />
          </div>
        </div>
        <div className="hidden justify-center border sm:flex">
          <img src={testimage} alt="" />
        </div>
      </div>
      <div className="mx-auto max-w-5xl pt-6">
        <div className="flex items-center gap-x-2">
          <p className="fontmedium text-sm text-white">Step 1 of 5</p>
          <ProgressBar progress={20} />
        </div>
      </div>
    </>
  )
}

export function StoreOnboarding({}: Props) {
  return (
    <div className="min-h-screen bg-black">
      <Header minimal />
      <DefaultScreen />
    </div>
  )
}
