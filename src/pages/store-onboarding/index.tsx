import { Header } from '../../components'
import testimage from '../../assets/ earthtree.png'
import { Routes, Route, useNavigate } from 'react-router-dom'

type Props = {}

function ChoiceBox({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group inline-flex w-28 cursor-pointer justify-center rounded-lg border p-2 transition-all duration-300 ease-in hover:bg-white"
    >
      <p className="text-sm font-medium text-white group-hover:text-black ">{title}</p>
    </div>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className=" h-2 w-40 rounded-lg border">
      <div className={`w-[10%] rounded-lg  bg-orange-400`}>.</div>
    </div>
  )
}

function DefaultScreen(params: type) {
  const navigate = useNavigate()
  return (
    <>
      <div className="mx-auto grid max-w-5xl grid-cols-1 justify-between border sm:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6 px-2 pb-20">
          <p className="text-3xl font-medium text-white">Select Entitty to Onboard</p>
          <div className="flex gap-x-4">
            <ChoiceBox onClick={() => navigate('new-store')} title="Employee" />
            <ChoiceBox onClick={() => navigate('new-employee')} title="Affiliate" />
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

function MainStoreOnboardingScreen() {
  return (
    <>
      <div className="mx-auto grid max-w-5xl grid-cols-1 justify-between border sm:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6 px-2 pb-20">
          <p className="text-3xl font-medium text-white">Enter the name of the new store</p>
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

function MainEmployeeOnboardingScreen() {
  return (
    <>
      <div className="mx-auto grid max-w-5xl grid-cols-1 justify-between border sm:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6 px-2 pb-20">
          <p className="text-3xl font-medium text-white">Enter the name of the new Employee</p>
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

export function StoreOnboarding() {
  return (
    <div className="min-h-screen bg-black">
      <Header minimal />
      <Routes>
        <Route path="/" element={<DefaultScreen />} />
        <Route path="/new-store" element={<MainStoreOnboardingScreen />} />
        <Route path="/new-employee" element={<MainEmployeeOnboardingScreen />} />
      </Routes>
    </div>
  )
}
