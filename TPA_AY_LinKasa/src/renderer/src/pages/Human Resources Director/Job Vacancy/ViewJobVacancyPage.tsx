import CardJobVacancy from '@renderer/components/Human Resources Director/CardJobVacancy'
import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Human Resources Director/Sidebar'
import { getJobVacancies } from '@renderer/controllers/JobVacancyController'
import { useEffect, useState } from 'react'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const ViewJobVacancyPage = () => {
  const [jobVacancies, setJobVacancies] = useState<JobVacancy[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'job-vacancy'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    const data = await getJobVacancies()
    setJobVacancies(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 d-flex flex-column gap-3 overflow-hidden">
          {jobVacancies && jobVacancies.length > 0 && (
            <h5 className="mt-2 mb-4 text-muted">
              Human Resources Director
              <i className="bi bi-arrow-right mx-2"></i>
              View Job Vacancy List
            </h5>
          )}
          <div className="d-flex flex-wrap gap-4 m-auto">
            {jobVacancies && jobVacancies.length > 0 ? (
              jobVacancies.map((jobVacancy) => (
                <CardJobVacancy
                  id={jobVacancy.id}
                  title={jobVacancy.jobTitle}
                  description={jobVacancy.jobDescription}
                  salary={jobVacancy.jobSalary}
                  requirements={jobVacancy.jobRequirement}
                />
              ))
            ) : (
              <div className="text-center my-4">
                <p className="lead">No job vacancy data records found.</p>
                <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewJobVacancyPage
