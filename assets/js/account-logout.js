;(() => {
  const buttons = document.querySelectorAll('[data-account-logout]')
  const status = document.querySelector('#account-status')
  if (!buttons.length) return

  async function logout(button) {
    button.disabled = true
    try {
      if (window.ValedriaSession?.demo) {
        await window.ValedriaSession.request('/logout', {})
      } else if (window.VALEDRIA_SERVER_SESSION) {
        const response = await fetch('/auth/logout', {
          credentials: 'same-origin',
          cache: 'no-store',
        })
        if (!response.ok) throw Error('Não foi possível encerrar a sessão do servidor.')
      }

      window.localStorage.removeItem('valedria-google-session')
      window.location.assign('login.html')
    } catch (error) {
      if (status) status.textContent = error.message || 'Não foi possível sair da conta. Tente novamente.'
      button.disabled = false
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => logout(button))
  }
})()