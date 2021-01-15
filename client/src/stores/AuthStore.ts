import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { AUTH_API_URL } from 'stores/constants'
import { RootStore } from './RootStore'

export class AuthStore {
  rootStore: RootStore
  isError: boolean
  isAuthed: boolean

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.isAuthed = false
    this.isError = false
    makeAutoObservable(this)
  }

  *login(login: string, password: string) {
    try {
      this.isError = false
      this.rootStore.uiStore.setSpinnerVisible(true)
      const { data } = yield axios.post(`${AUTH_API_URL}/login`, {
        login,
        password,
      })
      const { token, passwordMustBeChanged } = data

      yield this.rootStore.settingsStore.saveAuthSettings({
        token,
        credentials: { login, password },
      })

      if (passwordMustBeChanged) {
        this.rootStore.navigate('ChangePassword', { login })
      } else this.isAuthed = true
    } catch (err) {
      console.log('❌ Login error')
      this.isError = true
    } finally {
      this.rootStore.uiStore.setSpinnerVisible(false)
    }
  }

  *changePassword(login: string, newPassword: string) {
    try {
      this.isError = false
      this.rootStore.uiStore.setSpinnerVisible(true)
      yield axios.post(`${AUTH_API_URL}/changePassword`, {
        newPassword,
      })

      yield this.login(login, newPassword)
    } catch (err) {
      this.isError = true
    } finally {
      this.rootStore.uiStore.setSpinnerVisible(false)
    }
  }

  *signOut() {
    this.isAuthed = false
    yield this.rootStore.settingsStore.deleteAuthSettings()
  }
}
