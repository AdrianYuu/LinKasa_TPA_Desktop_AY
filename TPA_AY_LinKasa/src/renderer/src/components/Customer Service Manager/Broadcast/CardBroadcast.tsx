import { Link } from 'react-router-dom'

const CardBroadcast = ({ id, title, message, priorityLevel, date, simpleTime }) => {
  return (
    <div className="card">
      {priorityLevel === 'High' && (
        <div className="card-header fs-3 fw-bold text-danger">{priorityLevel.toUpperCase()}</div>
      )}
      {priorityLevel === 'Medium' && (
        <div className="card-header fs-3 fw-bold text-warning">{priorityLevel.toUpperCase()}</div>
      )}
      {priorityLevel === 'Low' && (
        <div className="card-header fs-3 fw-bold text-primary">{priorityLevel.toUpperCase()}</div>
      )}
      <div className="card-body">
        <h5 className="card-title fw-semibold">{title}</h5>
        <p className="card-text">{message}</p>
        <ul className="list-group mb-3 h-100">
          <li className="list-group-item h-100">
            <span className="fw-semibold">Date:</span>
            <br />
            {date}
          </li>
          <li className="list-group-item h-100">
            <span className="fw-semibold">Simple Date:</span>
            <br />
            {simpleTime}
          </li>
        </ul>
        <div className="mt-auto d-flex gap-2">
          <Link to={`/csm/edit-broadcast/${id}`} className="btn btn-outline-primary">
            <i className="bi bi-pencil-fill"></i> Edit
          </Link>
          <Link to={`/csm/delete-broadcast/${id}`} className="btn btn-outline-danger">
            <i className="bi bi-trash3-fill"></i> Delete
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardBroadcast
