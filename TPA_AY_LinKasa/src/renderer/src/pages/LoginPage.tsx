import Background from '../assets/Background.png'
import { FormEvent, useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { getCurrentUser } from '../controllers/AuthController'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorCredential, setErrorCredential] = useState('')

  const redirectUser = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) return

    if (currentUser.role === 'Human Resources Director') {
      navigate('/hrd')
    } else if (currentUser.role === 'Lost and Found Staff') {
      navigate('/laf')
    } else if (currentUser.role === 'Flight Operations Manager') {
      navigate('/fom')
    } else if (currentUser.role === 'Customer Service Manager') {
      navigate('/csm')
    } else if (currentUser.role === 'Information Desk Staff') {
      navigate('/ids')
    } else if (currentUser.role === 'Check-in Staff') {
      navigate('/cis')
    } else if (currentUser.role === 'Gate Agents') {
      navigate('/ga')
    } else if (currentUser.role === 'Airport Operations Manager') {
      navigate('/aom')
    } else if (currentUser.role === 'Ground Handling Manager') {
      navigate('/ghm')
    } else if (currentUser.role === 'Landside Operations Manager') {
      navigate('/lom')
    } else if (currentUser.role === 'Maintenance Manager') {
      navigate('/mm')
    } else if (currentUser.role === 'Customs and Border Control Officers') {
      navigate('/cabco')
    } else if (currentUser.role === 'Baggage Security Supervisor') {
      navigate('/bss')
    } else if (currentUser.role === 'Cargo Manager') {
      navigate('/cm')
    } else if (currentUser.role === 'Logistics Manager') {
      navigate('/lm')
    } else if (currentUser.role === 'Fuel Manager') {
      navigate('/fm')
    } else if (currentUser.role === 'Cargo Handlers') {
      navigate('/ch')
    } else if (currentUser.role === 'Civil Engineering Manager') {
      navigate('/cem')
    } else if (currentUser.role === 'Airport Director/CEO') {
      navigate('/ceo')
    } else if (currentUser.role === 'Chief Financial Officer (CFO)') {
      navigate('/cfo')
    } else if (currentUser.role == 'Chief Operations Officer (COO)') {
      navigate('/coo')
    } else if (currentUser.role === 'Chief Security Officer (CSO)') {
      navigate('/cso')
    }
  }

  useEffect(() => {
    setErrorEmail('')
    if (email === '') setErrorEmail("Email can't be empty!")
  }, [email])

  useEffect(() => {
    setErrorPassword('')
    if (password === '') setErrorPassword("Password can't be empty!")
  }, [password])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = !errorEmail && !errorPassword

    if (!isValid) return

    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        redirectUser()
      })
    } catch (error) {
      console.log('error')
      setErrorCredential('Invalid credential! Please use the valid credential.')
    }
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center p-5 text-white rounded-5">
      <img className="col-3 h-100" src={Background} alt="" />
      <div className="w-75 h-100 bg-black p-5 align-items-center">
        <div className="mb-3">
          <h1>Good to see you again!</h1>
          <p>To keep connected with us please login with your email and password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex gap-2 flex-column mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-danger">{errorEmail}</p>
          </div>
          <div className="d-flex gap-2 flex-column mb-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-danger">{errorPassword}</p>
          </div>
          <div className="mb-3">
            <button className="btn btn-outline-light">Login</button>
          </div>
          <p className="text-danger">{errorCredential}</p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
