import { makeAutoObservable } from 'mobx'

export class UIStore {
  spinnerVisible: boolean

  constructor() {
    this.spinnerVisible = false
    makeAutoObservable(this)
  }

  setSpinnerVisible(value: boolean) {
    this.spinnerVisible = value
  }
}
