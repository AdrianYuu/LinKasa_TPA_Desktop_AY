import { Link } from 'react-router-dom'

const CardJobVacancy = ({ id, title, description, salary, requirements }) => {
  return (
    <div
      className="card bg-light text-dark"
      style={{ width: '17rem', border: '1px solid #dee2e6' }}
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold mb-3 text-center">{title}</h5>
        <ul className="list-group mb-3 h-100">
          <li className="list-group-item">
            <span className="fw-semibold">Description:</span> <br />
            <p className="card-text text-muted">{description}</p>
          </li>
          <li className="list-group-item">
            <span className="fw-semibold">Salary:</span>
            <br />${salary}
          </li>
          <li className="list-group-item h-100">
            <span className="fw-semibold">Requirement:</span>
            <br />
            {requirements}
          </li>
        </ul>
        <div className="mt-auto d-flex gap-2">
          <Link to={`/hrd/edit-job-vacancy/${id}`} className="btn btn-outline-primary">
            <i className="bi bi-pencil-fill"></i> Edit
          </Link>
          <Link to={`/hrd/delete-job-vacancy/${id}`} className="btn btn-outline-danger">
            <i className="bi bi-trash3-fill"></i> Delete
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardJobVacancy
