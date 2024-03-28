import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../..//components/ui/button'
import { LockIcon } from 'lucide-react'
import heroImage from '../../assets/hero-image.png'
import OtpInput from './components/OtpInput'
import OnboardingRoutes from './routes/OnboardingRoutes'
import { baseUrl } from '../../constants/baseUrl'

function MainLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleAdminRoute() {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_email: email.trim(),
          admin_password: password,
        }),
      }
      const res = await fetch(
        `${baseUrl}/admin/confirm-admin-email?admin_email=${email.trim()}&admin_password=${password}`,
        options,
      )
      // const res = await fetch(`https://diet-dining-server.onrender.com/admin/confirm-admin-email?admin_email=${email}&admin_password=${password}`)
      const data = await res.json()
      const { _id, firstname, status, onboarded } = data
      console.log(_id, firstname, status)
      if (status == 'CONFIRMED') {
        localStorage.setItem('firstname', firstname)
        localStorage.setItem('_id', _id)
        if (!onboarded) {
          setLoading(false)
          return navigate(`/login/onboarding`)
        }

        if (onboarded) {
          setLoading(false)
          navigate(`/login/confirm-otp/${_id}?affiliate=TRUE`)
        }
        navigate(`/login/confirm-otp/${_id}`)
      } else if (status == 'REJECTED') {
        throw new Error('Invalid email or password')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError('Invalid email or password')
    }
  }

  async function handleAffiliateRoute() {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          affiliate_email: email.trim(),
          password,
        }),
      }
      const res = await fetch(
        `${baseUrl}/affiliates/confirm-affiliate-email?affiliate_email=${email.trim()}&password=${password}`,
        options,
      )
      // const res = await fetch(`https://diet-dining-server.onrender.com/admin/confirm-admin-email?admin_email=${email}&password=${password}`)
      const data = await res.json()
      const { _id, store_name, status, onboarded } = data

      // *IF NOT  ERRORS
      if (status == 'CONFIRMED') {
        // * SAVE AFFILIATE ID TO LOCAL STORAGE
        localStorage.setItem('_id', _id)

        // * SAVE AFFILIATE STORE NAME TO LOCAL STORAGE
        localStorage.setItem('store_name', store_name)

        // * NAVIGATE TO OTP SCREEN IF AFFILIATE HAS BEEN ONBOARDED
        if (onboarded) {
          navigate(`/login/confirm-otp/${_id}?affiliate=TRUE`)
        }
        // * NAVIGATE TO ONBOARDING SCREEN IF AFFILIATE HAS NOT BEEN ONBOARDED SET AFFILIATE PARAM TO TRUE
        if (!onboarded) {
          navigate(`/login/onboarding?affiliate=TRUE`)
        }
      } else if (status == 'REJECTED') {
        throw new Error('Invalid email or password')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError('Invalid email or password')
    }
  }

  async function confirmEmail() {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    setLoading(true)
    try {
      // * CHECK IF IS ADMIN EMAIL
      if (email.includes('@dietdining.org')) {
        handleAdminRoute()
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

        <div className="flex w-full flex-col gap-y-6 transition-all duration-300 ease-in-out">
          <input
            onFocus={() => setError('')}
            className="rounded-xl p-2 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError('')}
            className="rounded-xl p-2 "
            placeholder="Password"
            type="password"
          />
          {<p className={`text-center text-red-500 ${error ? 'block' : 'hidden'}`}>{error}</p>}
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
        <img className="w-full pt-8" src={heroImage} alt="" />
      </div>
    </section>
  )
}

const SecurePassPage = () => {
  const [otp, setOtp] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const { id } = useParams()

  const [URLSearchParams] = useSearchParams()

  const isAffiliate = URLSearchParams.get('affiliate')

  useEffect(() => {
    const isAffiliate = URLSearchParams.get('affiliate')
    if (isAffiliate == 'TRUE') {
      const storeName = localStorage.getItem('store_name')
      setName(storeName as string)
      return
    }
    const firstname = localStorage.getItem('firstname')
    setName(firstname as string)
  }, [])

  async function confirmOtp() {
    // * CHECK IF IS AFFILIATE
    if (isAffiliate == 'TRUE') {
      try {
        // const res = await fetch(`http://localhost:3000/affiliates/confirm-otp?admin_id=${id}&otp=${otp}`)
        const res = await fetch(`${baseUrl}/affiliates/confirm-otp?admin_id=${id}&otp=${otp}`)
        const data = await res.json()
        console.log(data)
        const { status } = data
        if (status == 'CONFIRMED') {
          // * SAVE AFFILIATE ID TO LOCAL STORAGE
          localStorage.setItem('_id', id as string)
          //* NAVIGATE TO AFFILIATE ROUTES
          window.location.replace(`/affiliate`)
        } else if (status == 'REJECTED') {
          throw new Error('Invalid Code')
        }
      } catch (error) {
        console.log(error)
        setError('Invalid Code')
      }
      return
    }
    try {
      const res = await fetch(`${baseUrl}/admin/confirm-otp?admin_id=${id}&otp=${otp}`)
      // const res = await fetch(`https://diet-dining-server.onrender.com/admin/confirm-otp?admin_id=${id}&otp=${otp}`)
      const data = await res.json()

      const { status } = data

      if (status == 'CONFIRMED') {
        localStorage.setItem('id', id as string)
        window.location.replace(`/dashboard`)
      }

      if (status == 'REJECTED') {
        throw new Error('Invalid Code')
      }
    } catch (error) {
      console.log(error)
      setError('Invalid Code')
    }
  }

  // TODO ADD STORE NAME TO PAGE
  return (
    <section className="mx-auto  grid w-full max-w-6xl gap-x-12   py-20 sm:grid-cols-2">
      <div className="flex flex-col items-center gap-y-6   px-4 sm:px-8 sm:py-16">
        <div className="">
          {!isAffiliate && <p className="text-center text-2xl font-medium text-white">Welcome Back {name}</p>}
          {isAffiliate && <p className="text-center text-2xl font-medium text-white">Welcome</p>}
          <p className="text-center text-gray-300">
            Please Generate a one time passcode from your diet dining companion app to verify your identity
          </p>
        </div>
        {/* <input
          className="w-full rounded-xl p-2 text-center placeholder:text-center "
          placeholder="One time passcode"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          type="text"
        /> */}
        <OtpInput confirmOtp={confirmOtp} value={otp} setValue={(e) => setOtp(e)} />
        {error && <p className="text-center text-red-400">{error}</p>}
        <div className="">
          {/* <Button className="mb-4  w-full" onClick={() => confirmOtp()}>
            <p className="text-lg font-medium">Confirm Code</p>
          </Button> */}
          <p className="mb-1 text-center text-sm text-blue-400">Dont have the app? click here to request access</p>
          <p className="text-sm text-gray-400">
            By continuing you agree to diet dinings terms of service and privacy policy
          </p>
        </div>
      </div>
      <div className="flex justify-center rounded-xl border py-16 ">
        <LockIcon color={!error ? 'white' : 'red'} size={300} />
      </div>
    </section>
  )
}

export const LoginPage = () => {
  return (
    <section className="flex min-h-screen flex-col bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl px-6 py-4">
        <p className="text-3xl  font-black text-white">
          Diet <span className="text-green-400">Dining</span>
        </p>
      </div>
      <Routes>
        <Route path="/" element={<MainLoginPage />} />
        <Route path="confirm-otp/:id" element={<SecurePassPage />} />
        <Route path="onboarding/*" element={<OnboardingRoutes />} />
      </Routes>
    </section>
  )
}
