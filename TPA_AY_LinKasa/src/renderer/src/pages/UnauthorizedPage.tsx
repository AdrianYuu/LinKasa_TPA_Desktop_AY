const UnauthorizedPage = () => {
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="container text-center mt-5">
      <h1 className="display-1">401 - Unauthorized</h1>
      <p className="lead">Sorry, you do not have permission to access this page.</p>
      <button className="btn btn-secondary" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  )
}

export default UnauthorizedPage
