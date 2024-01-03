import Sidebar from '@renderer/components/Lost and Found Staff/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getLogs } from '@renderer/controllers/LostAndFoundItemLogController'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewLostAndFoundItemLogPage = () => {
  const [lostAndFoundItemLogs, setLostAndFoundItemlogs] = useState<LostAndFoundItemLog[] | null>(
    null
  )
  const [returnedLogs, setReturnedLogs] = useState<LostAndFoundItemLog[] | null>(null)
  const [unclaimedLogs, setUnclaimedLogs] = useState<LostAndFoundItemLog[] | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lost-and-found-log'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      const logs = await getLogs()
      setLostAndFoundItemlogs(logs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterLogs()
  }, [unclaimedLogs, filterStatus])

  const filterLogs = () => {
    if (!lostAndFoundItemLogs) return

    if (filterStatus === 'Returned') {
      setReturnedLogs(lostAndFoundItemLogs.filter((log) => log.status.toLowerCase() === 'returned'))
      setUnclaimedLogs(null)
    } else if (filterStatus === 'Unclaimed') {
      setUnclaimedLogs(
        lostAndFoundItemLogs.filter((log) => log.status.toLowerCase() === 'unclaimed')
      )
      setReturnedLogs(null)
    } else {
      setReturnedLogs(null)
      setUnclaimedLogs(null)
    }
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          {lostAndFoundItemLogs && lostAndFoundItemLogs.length > 0 ? (
            <div>
              <h5 className="mt-2 mb-4 text-muted">
                Lost and Found
                <i className="bi bi-arrow-right mx-2"></i>
                View Lost and Found Item Log
              </h5>
              <div className="d-flex gap-2 mb-3">
                <button
                  className={`btn btn-outline-dark ${filterStatus === null ? 'active' : ''}`}
                  onClick={() => setFilterStatus(null)}
                >
                  All
                </button>
                <button
                  className={`btn btn-outline-dark ${filterStatus === 'Returned' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('Returned')}
                >
                  Returned
                </button>
                <button
                  className={`btn btn-outline-dark ${filterStatus === 'Unclaimed' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('Unclaimed')}
                >
                  Unclaimed
                </button>
              </div>
              {returnedLogs && returnedLogs.length === 0 && filterStatus === 'Returned' && (
                <p className="text-muted">No returned items found.</p>
              )}
              {unclaimedLogs && unclaimedLogs.length === 0 && filterStatus === 'Unclaimed' && (
                <p className="text-muted">No unclaimed items found.</p>
              )}
              {(filterStatus === 'Returned' && (!returnedLogs || returnedLogs.length === 0)) ||
                (filterStatus === 'Unclaimed' && (!unclaimedLogs || unclaimedLogs.length === 0)) ||
                (filterStatus === null &&
                  (!lostAndFoundItemLogs || lostAndFoundItemLogs.length === 0) && (
                    <p className="text-muted">No items found.</p>
                  ))}
              <table className="table table-striped table-hover table-responsive">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Description</th>
                    <th scope="col">Founder Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Image</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterStatus === 'Returned' && returnedLogs
                    ? returnedLogs.map((log, index) => (
                        <tr key={log.id}>
                          <th scope="row">{index + 1}.</th>
                          <td>{log.description}</td>
                          <td>{log.founderName}</td>
                          <td>{log.date}</td>
                          <td>{log.time}</td>
                          <td>
                            <img
                              src={log.itemPhotoURL}
                              alt=""
                              style={{ maxHeight: '250px', maxWidth: '250px', objectFit: 'cover' }}
                            />
                          </td>
                          <td className="text-success fw-bold">{log.status}</td>
                          <td className="text-center">
                            <Link
                              to={`/laf/edit-laf-item-log/${log.id}`}
                              className="d-flex justify-content-center align-items-center"
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </Link>
                          </td>
                        </tr>
                      ))
                    : filterStatus === 'Unclaimed' && unclaimedLogs
                      ? unclaimedLogs.map((log, index) => (
                          <tr key={log.id}>
                            <th scope="row">{index + 1}.</th>
                            <td>{log.description}</td>
                            <td>{log.founderName}</td>
                            <td>{log.date}</td>
                            <td>{log.time}</td>
                            <td>
                              <img
                                src={log.itemPhotoURL}
                                alt=""
                                style={{
                                  maxHeight: '250px',
                                  maxWidth: '250px',
                                  objectFit: 'cover'
                                }}
                              />
                            </td>
                            <td className="text-danger fw-bold">{log.status}</td>
                            <td className="text-center">
                              <Link
                                to={`/laf/edit-laf-item-log/${log.id}`}
                                className="d-flex justify-content-center align-items-center"
                              >
                                <i className="bi bi-pencil-fill"></i>
                              </Link>
                            </td>
                          </tr>
                        ))
                      : lostAndFoundItemLogs.map((log, index) => (
                          <tr key={log.id}>
                            <th scope="row">{index + 1}.</th>
                            <td>{log.description}</td>
                            <td>{log.founderName}</td>
                            <td>{log.date}</td>
                            <td>{log.time}</td>
                            <td>
                              <img
                                src={log.itemPhotoURL}
                                alt=""
                                style={{
                                  maxHeight: '250px',
                                  maxWidth: '250px',
                                  objectFit: 'cover'
                                }}
                              />
                            </td>
                            {log.status === 'Returned' ? (
                              <td className="text-success fw-bold">{log.status}</td>
                            ) : (
                              <td className="text-danger fw-bold">{log.status}</td>
                            )}
                            <td className="text-center">
                              <Link
                                to={`/laf/edit-laf-item-log/${log.id}`}
                                className="d-flex justify-content-center align-items-center"
                              >
                                <i className="bi bi-pencil-fill"></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No lost and found item log records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewLostAndFoundItemLogPage
