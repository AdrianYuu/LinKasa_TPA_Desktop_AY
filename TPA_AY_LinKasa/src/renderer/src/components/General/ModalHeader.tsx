const ModalHeader = () => {
  return (
    <div className="position-fixed bottom-0 end-0 p-3 z-3">
      <button
        type="button"
        className="btn btn-dark rounded-circle btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#chatModal"
      >
        <i className="bi bi-chat"></i>
      </button>
    </div>
  )
}

export default ModalHeader
