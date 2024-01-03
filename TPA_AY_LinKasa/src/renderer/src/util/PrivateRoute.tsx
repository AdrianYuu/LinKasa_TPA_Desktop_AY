import { getCurrentUser } from '@renderer/controllers/AuthController'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import UnauthorizedPage from '@renderer/pages/UnauthorizedPage'

const PrivateRoutes = ({ role }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser()

      if (!currentUser) {
        setIsValid(false)
        setIsLoading(false)
        return
      }

      setIsValid(currentUser.role === role)
      setIsLoading(false)
    }

    fetchCurrentUser()
  }, [role])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isValid) {
    return <Outlet />
  } else {
    return <UnauthorizedPage />
  }
}

export default PrivateRoutes
