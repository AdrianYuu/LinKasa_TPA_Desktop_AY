const NotFoundPage = () => {
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="container text-center mt-5">
      <h1 className="display-1">404 - Not Found</h1>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <button className="btn btn-secondary" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  )
}

export default NotFoundPage
