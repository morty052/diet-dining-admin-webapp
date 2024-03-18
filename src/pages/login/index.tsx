import { useState } from 'react'
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { LockIcon } from 'lucide-react'

function MainLoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleAdminRoute() {
    // const res = await fetch(`http://localhost:3000/admin/confirm-admin-email?admin_email=${email}`)
    // const res = await fetch(`https://diet-dining-server.onrender.com/admin/confirm-admin-email?admin_email=${email}`)
    // const data = await res.json()
    // const { _id } = data
    const _id = 'anthony'
    navigate(`/login/confirm-otp/${_id}?affiliate=FALSE`)
    // navigate(`/login/confirm-otp/${'adminrouteworks'}?affiliate=FALSE`)
  }

  async function handleAffiliateRoute() {
    const res = await fetch(`http://localhost:3000/affiliates/confirm-affiliate-email?affiliate_email=${email}`)
    // const res = await fetch(`https://diet-dining-server.onrender.com/admin/confirm-admin-email?admin_email=${email}`)
    const data = await res.json()
    const { _id } = data
    console.log(_id)
    // const _id = 'anthony'
    navigate(`/login/confirm-otp/${_id}?affiliate=TRUE`)
  }

  async function confirmEmail() {
    setLoading(true)
    try {
      // * CHECK IF IS ADMIN EMAIL
      if (email.includes('@dietdining.org')) {
        handleAdminRoute()
        setLoading(false)
        return
      }
      // * HANDLE AFFILIATE EMAIL
      handleAffiliateRoute()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="mx-auto  grid w-full max-w-6xl gap-x-12   py-20 sm:grid-cols-2">
      <div className=" flex flex-col items-center  px-4 sm:px-8 sm:py-16">
        <p className=" text-center text-2xl  font-semibold text-gray-50 sm:text-4xl">Welcome</p>
        <p className="mb-6 text-gray-50 sm:mb-10">Please Sign in to continue to Diet dining admin panel</p>

        <div className="flex w-full flex-col gap-y-6">
          <input
            className="rounded-xl p-2 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="text"
          />
          <input className="rounded-xl p-2 " placeholder="Password" type="text" />
        </div>
        <div className="my-8  h-0.5 w-full border border-gray-300/50"></div>
        <Button className="mb-4  w-full" onClick={() => confirmEmail()}>
          <p className="text-lg font-medium">{loading ? 'Loading...' : 'Login'}</p>
        </Button>
        <p className="text-sm text-blue-400">Dont have an account? click here to create instead</p>
        <p className="text-sm text-gray-400">
          By continuing you agree to diet dinings terms of service and privacy policy
        </p>
      </div>
      <div className="border-l border-white/50">
        <img className="w-full pt-8" src="https://dietdining.ca/img/home-one/banner/home-header.png" alt="" />
      </div>
    </section>
  )
}

const SecurePassPage = () => {
  const [otp, setOtp] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const [URLSearchParams] = useSearchParams()

  const { id } = useParams()

  async function confirmOtp() {
    const isAffiliate = URLSearchParams.get('affiliate')
    // * CHECK IF IS AFFILIATE
    if (isAffiliate == 'TRUE') {
      // * SAVE AFFILIATE ID TO LOCAL STORAGE
      localStorage.setItem('_id', id as string)
      //* NAVIGATE TO AFFILIATE ROUTES
      window.location.replace(`/affiliate`)
      return
    }
    try {
      const res = await fetch(
        `http://localhost:3000/admin/confirm-otp?admin_id=4118a74d-0b15-4f81-8cab-135e035cc395&otp=${otp}`,
      )
      const data = await res.json()
      localStorage.setItem('id', id as string)
      window.location.replace(`/dashboard/${id}`)
      // const status = data?.status

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="mx-auto  grid w-full max-w-6xl gap-x-12   py-20 sm:grid-cols-2">
      <div className="flex flex-col items-center gap-y-6   px-4 sm:px-8 sm:py-16">
        <div className="">
          <p className="text-center text-2xl font-medium text-white">Welcome Back Anthony</p>
          <p className="text-center text-white">
            Please Generate a one time passcode from diet dining admin app to verify your identity
          </p>
        </div>
        <input
          className="w-full rounded-xl p-2 text-center placeholder:text-center "
          placeholder="One time passcode"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          type="text"
        />
        <div className="">
          <Button className="mb-4  w-full" onClick={() => confirmOtp()}>
            <p className="text-lg font-medium">Confirm Code</p>
          </Button>
          <p className="mb-1 text-center text-sm text-blue-400">Dont have the app? click here to request access</p>
          <p className="text-sm text-gray-400">
            By continuing you agree to diet dinings terms of service and privacy policy
          </p>
        </div>
      </div>
      <div className="flex justify-center rounded-xl border py-16 ">
        <LockIcon color="white" size={300} />
      </div>
    </section>
  )
}

export const LoginPage = () => {
  return (
    <section className="flex flex-col bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl px-6 py-4">
        <p className="text-3xl  font-black text-white">
          Diet <span className="text-green-400">Dining</span>
        </p>
      </div>
      <Routes>
        <Route path="/" element={<MainLoginPage />} />
        <Route path="confirm-otp/:id" element={<SecurePassPage />} />
      </Routes>
    </section>
  )
}
