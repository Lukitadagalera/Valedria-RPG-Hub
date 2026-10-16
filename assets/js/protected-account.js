;(() => {
  const sessionKey = 'valedria-google-session'
  let localUser = null

  try {
    localUser = JSON.parse(window.localStorage.getItem(sessionKey) || 'null')
  } catch {
    localUser = null
  }

  const valid = user => user && typeof user.id === 'string' && typeof user.email === 'string'
  window.VALEDRIA_SERVER_SESSION = false
  window.VALEDRIA_ACCOUNT_USER = fetch('/auth/status', {
    cache: 'no-store',
    credentials: 'same-origin',
  })
    .then(async response => {
      if (!response.ok) return null
      const result = await response.json()
      return result.success && valid(result.user) ? result.user : null
    })
    .then(user => {
      if (user) {
        window.localStorage.setItem(sessionKey, JSON.stringify(user))
        window.VALEDRIA_SERVER_SESSION = true
        return user
      }
      if (!valid(localUser)) {
        window.location.replace('login.html')
        return null
      }
      return localUser
    })
    .catch(error => {
      if (valid(localUser)) return localUser
      console.error('Não foi possível validar a sessão no servidor:', error.message)
      window.location.replace('login.html')
      return null
    })
})()
