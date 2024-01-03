import { useNavigate } from 'react-router-dom'
import employee from '../assets/employee.png'
import employeeTraining from '../assets/employee-training.jpg'
import employeeDevelopment from '../assets/employee-development.png'
import jobVacancy from '../assets/job-vacancy.png'
import laf from '../assets/laf.jpg'

const CardInformation = ({ count, type }) => {
  const navigate = useNavigate()

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          {type === 'employee' && (
            <img
              src={employee}
              className="img-fluid rounded-start"
              style={{ height: '100%' }}
              alt="Employee"
            />
          )}
          {type === 'employee-training' && (
            <img
              src={employeeTraining}
              className="img-fluid rounded-start"
              style={{ height: '100%' }}
              alt="Employee"
            />
          )}
          {type === 'employee-development' && (
            <img
              src={employeeDevelopment}
              className="img-fluid rounded-start"
              style={{ height: '100%' }}
              alt="Employee"
            />
          )}
          {type === 'job-vacancy' && (
            <img
              src={jobVacancy}
              className="img-fluid rounded-start"
              style={{ height: '100%' }}
              alt="Employee"
            />
          )}
          {type === 'laf' && (
            <img
              src={laf}
              className="img-fluid rounded-start"
              style={{ height: '100%' }}
              alt="Employee"
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {type === 'employee' && <>Employee Information</>}
              {type === 'employee-training' && <>Employee Training Information</>}
              {type === 'employee-development' && <>Employee Development Program Information</>}
              {type === 'job-vacancy' && <>Job Vacancy Information</>}
              {type === 'laf' && <>Lost and Found Information</>}
            </h5>
            <p className="card-text">
              {type === 'employee' && <>Currently, the company has a total of {count} employees.</>}
              {type === 'employee-training' && (
                <>Currently, the company has a total of {count} empolyee training schedules.</>
              )}
              {type === 'employee-development' && (
                <>
                  Currently, the company has a total of {count} empolyee development program
                  schedules.
                </>
              )}
              {type === 'job-vacancy' && (
                <>Currently, the company has a total of {count} job vacancy that are opened.</>
              )}
              {type === 'laf' && <>Currently, there are {count} lost and found item logs.</>}
            </p>
            <p className="card-text">
              <small className="text-body-secondary">Last updated now.</small>
            </p>
            {type === 'employee' && (
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate('/hrd/view-employee')}
              >
                View Employees
              </button>
            )}
            {type === 'employee-training' && (
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate('/hrd/view-employee-training')}
              >
                View Employee Training
              </button>
            )}
            {type === 'employee-development' && (
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate('/hrd/view-employee-development-program')}
              >
                View Employee Development Program
              </button>
            )}
            {type === 'job-vacancy' && (
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate('/hrd/view-job-vacancy')}
              >
                View Job Vacancy
              </button>
            )}
            {type === 'laf' && (
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate('/laf/view-laf-item-log')}
              >
                View Lost and Found Log
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardInformation
