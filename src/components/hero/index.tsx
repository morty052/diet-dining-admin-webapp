import { Button } from '../ui/button'
import { useState } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { baseUrl } from '../../constants/baseUrl'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  async function confirmEmail() {
    try {
      const res = await fetch(`${baseUrl}/admin/confirm-admin-email?admin_email=${email}`)
      const data = await res.json()
      // const status = data?.status
      const { _id } = data
      console.log(_id)
      navigate(`confirm-otp/${_id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="w-full py-32 md:py-48">
      <p>Welcome</p>

      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="text" />
      <input placeholder="Password" type="text" />
      <Button onClick={() => confirmEmail()}>
        <p>Login</p>
      </Button>
    </section>
  )
}

const SecurePassPage = () => {
  const [otp, setOtp] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const { id } = useParams()

  async function confirmOtp() {
    try {
      const res = await fetch(`${baseUrl}/admin/confirm-otp?admin_id=4118a74d-0b15-4f81-8cab-135e035cc395&otp=${otp}`)
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
    <section className="mx-auto flex w-full max-w-2xl flex-col space-y-4 py-32 ">
      <p className="text-center text-white">Welcome</p>
      <p className="text-center text-white">
        Please Generate a one time passcode from diet dining admin app to verify your identity
      </p>
      <input placeholder="One time passcode" value={otp} onChange={(e) => setOtp(e.target.value)} type="text" />
      <Button onClick={() => confirmOtp()}>
        <p>Login</p>
      </Button>
      {confirmed && <p className="text-white">Confirmed</p>}
    </section>
  )
}

export const Hero = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      <section className="w-full py-32 md:py-48">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/confirm-otp/:id" element={<SecurePassPage />} />
        </Routes>
      </section>
    </div>
  )
}
