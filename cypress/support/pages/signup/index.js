class SignupPage {
    go() {
        cy.visit('/signup')
    }

    form(user) {
        cy.get('input[placeholder^="Nome"]').type(user.name)
        cy.get('input[placeholder$="email"]').type(user.email)
        cy.get('input[placeholder*="senha"]').type(user.password)
    }

    submit() {
        cy.contains('button', 'Cadastrar').click()
    }

    toastHaveText() {
        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    }
}