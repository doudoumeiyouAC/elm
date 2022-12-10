export const setLocStorage = (name, latitude, longitude) => {
  localStorage.setItem('addressName', name)
  localStorage.setItem('latitude', latitude)
  localStorage.setItem('longitude', longitude)
}