;(() => {
  const sessionKey = 'valedria-google-session'
  const account = document.querySelector('#account-private')
  const menu = document.querySelector('.account-menu')
  const workspace = document.querySelector('#account-workspace')
  const links = [...document.querySelectorAll('.account-menu a[aria-controls]')]
  const panels = [...document.querySelectorAll('.account-content [role="region"]')]
  if (!account || !menu || !workspace || !links.length || !panels.length) return

  const syncMenuHeight = () => {
    workspace.style.setProperty('--account-menu-height', `${menu.getBoundingClientRect().height}px`)
  }
  syncMenuHeight()
  if ('ResizeObserver' in window) {
    new ResizeObserver(syncMenuHeight).observe(menu)
  } else {
    window.addEventListener('resize', syncMenuHeight)
  }

  const selectPanel = id => {
    const selectedLink = links.find(link => link.hash === `#${id}`)
    const selectedPanel = panels.find(panel => panel.id === id)
    if (!selectedLink || !selectedPanel) return false

    account.hidden = false
    for (const link of links) {
      if (link === selectedLink) link.setAttribute('aria-current', 'page')
      else link.removeAttribute('aria-current')
    }
    for (const panel of panels) panel.hidden = panel !== selectedPanel
    return true
  }

  const syncFromHash = () => {
    let id = ''
    try {
      id = decodeURIComponent(window.location.hash.slice(1))
    } catch (error) {
      console.error('Não foi possível interpretar a seção da conta:', error.message)
    }
    if (!selectPanel(id)) selectPanel('dados')
  }

  function startNavigation() {
    for (const link of links) {
      link.addEventListener('click', () => {
        const id = link.hash.slice(1)
        if (selectPanel(id)) return
        selectPanel('dados')
      })
    }
    window.addEventListener('hashchange', syncFromHash)
    syncFromHash()
  }

  try {
    const user = JSON.parse(window.localStorage.getItem(sessionKey) || 'null')
    if (user && typeof user.id === 'string' && typeof user.email === 'string') {
      startNavigation()
      return
    }
  } catch (error) {
    console.error('Não foi possível validar a sessão da conta:', error.message)
  }
  window.VALEDRIA_ACCOUNT_USER?.then(user => {
    if (user) startNavigation()
  })
})()
