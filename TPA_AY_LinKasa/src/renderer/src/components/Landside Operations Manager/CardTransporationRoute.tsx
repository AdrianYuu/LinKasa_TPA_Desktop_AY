import { Link } from 'react-router-dom'

const CardTransportationRoute = ({
  id,
  startLocation,
  destination,
  stops,
  responsibleEmployees
}) => (
  <div className="card mb-3" style={{ width: '18rem', minHeight: '400px' }}>
    <div className="card-header bg-dark text-white fw-bold">Start: {startLocation}</div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <strong>Stops:</strong>
      </li>
      {stops.map((stop, index) => (
        <li className="list-group-item" key={index}>
          {index + 1}. {stop}
        </li>
      ))}
    </ul>
    <div className="card-footer bg-dark text-white fw-bold">Destination: {destination}</div>
    <ul className="list-group list-group-flush flex-grow-1">
      <li className="list-group-item">
        <strong>Responsible Employees:</strong>
      </li>
      {responsibleEmployees.map((employee, index) => (
        <li className="list-group-item" key={index}>
          {index + 1}. {employee}
        </li>
      ))}
    </ul>
    <div className="card-footer d-flex gap-3">
      <Link to={`/lom/edit-transportation-route/${id}`} className="btn btn-outline-primary">
        <i className="bi bi-pencil-fill"></i> Edit
      </Link>
      <Link to={`/lom/delete-transportation-route/${id}`} className="btn btn-outline-danger">
        <i className="bi bi-trash3-fill"></i> Delete
      </Link>
    </div>
  </div>
)

export default CardTransportationRoute
