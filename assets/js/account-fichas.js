;(() => {
  const section = document.querySelector('#fichas')
  const list = document.querySelector('#account-fichas-list')
  const status = document.querySelector('#account-fichas-status')
  if (!section || !list || !status) return

  let loaded = false
  let pending = false
  let fichas = []
  let fichaToDelete = null
  const deleteDialog = document.querySelector('#delete-ficha-dialog')
  const deleteFichaName = document.querySelector('#delete-ficha-name')
  const deleteFichaError = document.querySelector('#delete-ficha-error')
  const confirmDeleteButton = document.querySelector('#confirm-delete-ficha')
  const cancelDeleteButton = document.querySelector('#cancel-delete-ficha')

  function message(text) {
    status.replaceChildren(document.createTextNode(text))
    if (!text.includes('Google')) return
    const link = document.createElement('a')
    link.href = '/auth/google'
    link.textContent = ' Entrar com o Google para habilitar o salvamento na conta.'
    status.append(link)
  }

  function render(sheets) {
    list.replaceChildren()
    if (!sheets.length) {
      message('Você ainda não salvou fichas na sua conta.')
      return
    }
    for (const ficha of sheets) {
      const card = document.createElement('article')
      card.className = 'account-subpanel account-ficha-card'
      const info = document.createElement('div')
      info.className = 'account-ficha-info'
      const title = document.createElement('h3')
      title.textContent = ficha.nome || 'Personagem sem nome'
      const details = document.createElement('p')
      details.textContent = [
        [ficha.raca, ficha.subraca].filter(Boolean).join(' · '),
        ficha.nivel ? `Nível ${ficha.nivel}` : '',
        ficha.papel,
      ]
        .filter(Boolean)
        .join(' · ')
      const open = document.createElement('a')
      open.className = 'account-ficha-edit'
      open.href = `ficha.html?ficha=${encodeURIComponent(ficha._id)}`
      open.setAttribute('aria-label', `Editar ficha ${title.textContent}`)
      open.title = 'Editar ficha'
      open.innerHTML =
        '<svg data-lucide="pencil" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>'
      const remove = document.createElement('button')
      remove.type = 'button'
      remove.className = 'account-ficha-delete'
      remove.setAttribute('aria-label', `Excluir ficha ${title.textContent}`)
      remove.title = 'Excluir ficha'
      remove.innerHTML =
        '<svg data-lucide="trash-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>'
      remove.addEventListener('click', () => {
        fichaToDelete = ficha
        deleteFichaName.textContent = title.textContent
        deleteFichaError.hidden = true
        deleteFichaError.textContent = ''
        deleteDialog.showModal()
      })
      const actions = document.createElement('div')
      actions.className = 'account-ficha-actions'
      actions.append(remove, open)
      info.append(title, details)
      card.append(info, actions)
      list.append(card)
    }
    message('')
  }

  cancelDeleteButton.addEventListener('click', () => {
    fichaToDelete = null
    deleteDialog.close()
  })

  deleteDialog.addEventListener('click', (event) => {
    if (event.target === deleteDialog) {
      fichaToDelete = null
      deleteDialog.close()
    }
  })

  deleteDialog.addEventListener('close', () => {
    fichaToDelete = null
  })

  confirmDeleteButton.addEventListener('click', async () => {
    if (!fichaToDelete || confirmDeleteButton.disabled) return
    const deleting = fichaToDelete
    confirmDeleteButton.disabled = true
    message('Excluindo ficha...')
    try {
      const response = await fetch(`/api/fichas/${encodeURIComponent(deleting._id)}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      })
      if (!(response.headers.get('content-type') || '').includes('application/json')) {
        throw Error(
          response.status === 404
            ? 'A rota de fichas não está disponível neste servidor. Reinicie-o e tente novamente.'
            : `O servidor retornou uma resposta inesperada (HTTP ${response.status}).`,
        )
      }
      const result = await response.json()
      if (!response.ok) {
        if (response.status === 401) {
          throw Error('Entre novamente com Google para excluir esta ficha.')
        }
        throw Error(result.error || 'Não foi possível excluir a ficha.')
      }
      fichas = fichas.filter((ficha) => ficha._id !== deleting._id)
      render(fichas)
      deleteDialog.close()
    } catch (error) {
      deleteFichaError.textContent = error.message || 'Não foi possível excluir a ficha.'
      deleteFichaError.hidden = false
    } finally {
      confirmDeleteButton.disabled = false
    }
  })

  async function load() {
    if (pending || loaded) return
    pending = true
    message('Carregando suas fichas...')
    try {
      await window.VALEDRIA_ACCOUNT_USER
      if (!window.VALEDRIA_SERVER_SESSION) {
        message('Sua conta local não tem uma sessão segura ativa no servidor.')
        return
      }
      const response = await fetch('/api/fichas', {
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      })
      const result = await response.json()
      if (!response.ok) {
        if (response.status === 401) {
          message('Entre novamente com Google para consultar e salvar fichas na nuvem.')
          return
        }
        throw Error(result.error || 'Não foi possível carregar as fichas.')
      }
      fichas = result.fichas || []
      render(fichas)
      loaded = true
    } catch (error) {
      message(error.message || 'Não foi possível carregar as fichas.')
    } finally {
      pending = false
    }
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#fichas') void load()
  })
  if (window.location.hash === '#fichas') void load()
})()
