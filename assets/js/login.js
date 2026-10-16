;(() => {
  'use strict'

  const button = document.querySelector('#google-login-button')
  const status = document.querySelector('#login-status')
  const sessionKey = 'valedria-google-session'
  if (!button || !status) return

  let googleClientReady = false
  let googleScriptPromise

  function loadGoogleIdentity() {
    if (window.google?.accounts?.id) return Promise.resolve()
    if (googleScriptPromise) return googleScriptPromise

    googleScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.onload = resolve
      script.onerror = () => reject(Error('Não foi possível carregar o Google.'))
      document.head.append(script)
    })

    return googleScriptPromise
  }

  async function handleCredentialResponse(response) {
    try {
      const result = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      })
      const data = await result.json()

      if (!result.ok || !data.success) throw Error(data.message || 'Falha ao autenticar.')
      if (!data.user?.id || !data.user?.email) throw Error('Resposta de autenticação inválida.')

      window.localStorage.setItem(
        sessionKey,
        JSON.stringify({ ...data.user, accountType: data.user.accountType || 'visitor' }),
      )
      console.log('login realizado com sucesso')
      status.textContent = 'Login confirmado. Redirecionando para Minha conta...'
      window.location.assign('/conta.html')
    } catch (error) {
      console.error('erro no login', error)
      status.textContent = error.message || 'Não foi possível concluir o login com o Google. Tente novamente.'
      button.disabled = false
    }
  }

  async function initializeGoogleLogin() {
    button.disabled = true
    status.textContent = 'Conectando ao Google...'

    try {
      const configResponse = await fetch('/api/auth/config', { cache: 'no-store' })
      if (!configResponse.ok) throw Error('Configuração do Google indisponível.')
      const { clientId } = await configResponse.json()
      if (!clientId) throw Error('Client ID do Google indisponível.')

      await loadGoogleIdentity()
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      })
      googleClientReady = true
      button.disabled = false
      status.textContent = ''
    } catch (error) {
      console.error('erro no login', error)
      status.textContent = 'O login com Google não está disponível agora.'
      button.disabled = false
    }
  }

  button.addEventListener('click', async () => {
    if (!googleClientReady) await initializeGoogleLogin()
    if (!googleClientReady) return

    button.disabled = true
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        const reason = notification.getNotDisplayedReason?.()
        if (reason === 'unregistered_origin') {
          status.textContent = `A origem ${window.location.origin} não está autorizada no Google OAuth. Cadastre-a como origem JavaScript autorizada do cliente OAuth Web.`
        } else if (reason === 'invalid_client') {
          status.textContent = 'O Client ID do Google é inválido ou não corresponde a um cliente OAuth Web.'
        } else {
          status.textContent = 'O Google não abriu a tela de login. Verifique a configuração OAuth e tente novamente.'
        }
        console.error('erro no login', reason || 'Google prompt não exibido')
        button.disabled = false
      } else if (notification.isSkippedMoment()) {
        status.textContent = 'O Google não abriu a tela de login. Tente novamente.'
        console.error('erro no login', 'Google prompt ignorado')
        button.disabled = false
      }
    })
  })

  initializeGoogleLogin()
})()
