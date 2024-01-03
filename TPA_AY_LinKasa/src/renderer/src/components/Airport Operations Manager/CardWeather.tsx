import { useState, useEffect } from 'react'

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null)
  const CITY_NAME = 'Jakarta'
  const API_URL = ``
  // Fill with your api at openweathermap.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchData()
  }, [API_URL])

  return (
    <div className="card shadow">
      <div className="card-header bg-dark text-white text-center">
        <h5 className="mb-0">Current Weather in {CITY_NAME}</h5>
      </div>
      <div className="card-body text-dark bg-light">
        {weatherData ? (
          <div className="d-flex gap-5">
            <ul className="list-group mb-1">
              <li className="list-group-item">
                <span className="fw-semibold">Temperature:</span>
                <p>{`${weatherData.main.temp}°C`}</p>
              </li>
              <li className="list-group-item">
                <span className="fw-semibold">Min Temperature:</span>
                <p>{`${weatherData.main.temp_min}°C`}</p>
              </li>
              <li className="list-group-item">
                <span className="fw-semibold">Max Temperature:</span>
                <p>{`${weatherData.main.temp_max}°C`}</p>
              </li>
              <li className="list-group-item">
                <span className="fw-semibold">Description:</span>
                <p>{`${weatherData.weather[0].description}`}</p>
              </li>
              <li className="list-group-item">
                <span className="fw-semibold">Humidity:</span>
                <p>{`${weatherData.main.humidity}%`}</p>
              </li>
            </ul>
            <ul className="list-group mb-3 h-100">
              <li className="list-group-item">
                <span className="fw-semibold">Wind Speed:</span>
                <p>{`${weatherData.wind.speed}`}</p>
              </li>
              <li className="list-group-item">
                <span className="fw-semibold">Wind Deg:</span>
                <p>{`${weatherData.wind.deg}`}</p>
              </li>
            </ul>
          </div>
        ) : (
          <div className="text-center">
            <p>Loading weather data...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherCard
