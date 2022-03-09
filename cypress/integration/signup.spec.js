describe('Cadastro', () => {
    context('Quando o usuário é novato', () => {
        const user = {
            name: 'Fernando Papito',
            email: 'papito@samuraibs.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('removeUser', user.email)
                .then((result) => {
                    cy.log(result)
                })
        })

        it('deve cadastrar um novo usuário', () => {
            cy.visit('/signup')

            cy.get('input[placeholder^="Nome"]').type(user.name)
            cy.get('input[placeholder$="email"]').type(user.email)
            cy.get('input[placeholder*="senha"]').type(user.password)

            /* cy.intercept('POST', '/users', {
                statusCode: 200
            }).as('postUser') */

            cy.contains('button', 'Cadastrar').click()

            // cy.wait('@postUser')

            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o e-mail já existe', () => {
        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.task('removeUser', user.email)
                .then((result) => {
                    cy.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('não deve cadastrar o usuário', () => {
            cy.visit('/signup')

            cy.get('input[placeholder^="Nome"]').type(user.name)
            cy.get('input[placeholder$="email"]').type(user.email)
            cy.get('input[placeholder*="senha"]').type(user.password)

            cy.contains('button', 'Cadastrar').click()

            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Email já cadastrado para outro usuário.')
        })
    })
})