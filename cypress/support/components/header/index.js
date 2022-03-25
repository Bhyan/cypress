import { el } from './elements'


class Header {
    userLoggerIn(userName) {
        cy.get(el.fullName, { timeout: 7000 })
            .should('be.visible')
            .should('have.text', userName)
    }
}

export default new Header()