import { el } from './elements'
import toast from '../../components/toast'


class ResetPassPage {

    constructor() {
        this.toast = toast
    }

    go(token) {
        cy.visit('/reset-password?token=' + token)
    }

    form(newPass, confimPass) {
        cy.get(el.password)
            .clear()
            .type(newPass)

        cy.get(el.passConfirm)
            .clear()
            .type(confimPass)
    }

    submit() {
        cy.contains(el.changeButton).click()
    }
}

export default new ResetPassPage()