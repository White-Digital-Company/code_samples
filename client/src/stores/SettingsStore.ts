import { makeAutoObservable, flowResult } from 'mobx'
import axios, { AxiosError } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootStore } from 'stores/RootStore'
import {
  AUTH_API_URL,
  AUTH_CREDENTIALS_KEY,
  AUTH_TOKEN_KEY,
  DEFAULT_NAVIGATOR_KEY,
} from 'stores/constants'

export type DefaultNavigator = 'google' | 'waze' | 'osmand'

export class SettingsStore {
  rootStore: RootStore
  isLoading: boolean
  defaultNavigator: DefaultNavigator

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.isLoading = true
    this.defaultNavigator = 'google'
    makeAutoObservable(this)
    // this.debug_delete()
  }

  *initialize() {
    const token = yield AsyncStorage.getItem(AUTH_TOKEN_KEY)
    const credentials = yield AsyncStorage.getItem(AUTH_CREDENTIALS_KEY)
    const defaultNavigator = yield AsyncStorage.getItem(DEFAULT_NAVIGATOR_KEY)
    if (token && credentials) {
      this.saveAuthSettings({ token, credentials }, false)
      this.rootStore.authStore.isAuthed = true
    }
    this.setAxiosAuthErrorHandler()
    if (defaultNavigator) this.defaultNavigator = defaultNavigator
    this.isLoading = false
  }

  *changeDefaultNavigator(defaultNavigator: DefaultNavigator) {
    this.defaultNavigator = defaultNavigator
    yield AsyncStorage.setItem(DEFAULT_NAVIGATOR_KEY, defaultNavigator)
  }

  setAxiosAuthErrorHandler() {
    axios.interceptors.response.use(undefined, async (err: AxiosError) => {
      console.log(
        '🟠 ERR HANDLER',
        JSON.stringify(
          {
            message: err.message,
            tokenExists: !!err.request?.headers?.Authorization,
          },
          null,
          2,
        ),
      )

      if (
        err.config &&
        err.response &&
        [401, 403].includes(err.response.status)
      ) {
        if (err.response.status === 401)
          return flowResult(this.rootStore.authStore.signOut())

        const credentials = JSON.parse(
          (await AsyncStorage.getItem(AUTH_CREDENTIALS_KEY)) || 'null',
        ) as { login: string; password: string } | null

        if (credentials) {
          await this.deleteAuthSettings()

          const { data } = await axios.post(
            `${AUTH_API_URL}/login`,
            credentials,
          )
          const { token } = data
          this.saveAuthSettings({ token, credentials })

          err.config.headers.Authorization = `Bearer ${token}`
          return axios.request(err.config)
        } else return flowResult(this.rootStore.authStore.signOut())
      }

      throw err
    })
  }

  async saveAuthSettings(
    {
      token,
      credentials,
    }: {
      token: string
      credentials: { login: string; password: string }
    },
    withCaching: boolean = true,
  ) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`
    if (withCaching) {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token)
      await AsyncStorage.setItem(
        AUTH_CREDENTIALS_KEY,
        JSON.stringify(credentials),
      )
    }
  }

  async deleteAuthSettings() {
    delete axios.defaults.headers['Authorization']
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY)
    await AsyncStorage.removeItem(AUTH_CREDENTIALS_KEY)
  }

  private debug_delete() {
    AsyncStorage.removeItem(AUTH_TOKEN_KEY)
  }
}
