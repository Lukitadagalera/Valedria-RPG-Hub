;(() => {
  const planElement = document.querySelector('#account-plan-name')
  const titleElement = document.querySelector('#account-view-title')
  const sessionKey = 'valedria-google-session'
  if (!planElement && !titleElement) return

  const planNames = {
    visitor: 'Visitante',
    contador: 'Contador de Histórias',
    mestre: 'Mestre das Aventuras',
    deus: 'Deus das Lendas',
  }

  function render(user) {
    const accountType = Object.hasOwn(planNames, user?.accountType) ? user.accountType : 'visitor'
    const userName = typeof user?.name === 'string' ? user.name.trim() : ''
    if (planElement) planElement.textContent = planNames[accountType]
    if (titleElement && userName) titleElement.textContent = `Olá, ${userName}`
  }

  try {
    const user = JSON.parse(window.localStorage.getItem(sessionKey) || 'null')
    if (user) {
      render(user)
      return
    }
  } catch (error) {
    console.error('Não foi possível ler o plano da conta:', error.message)
  }
  window.VALEDRIA_ACCOUNT_USER?.then(render)
})()
