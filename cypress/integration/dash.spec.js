


describe('Dashboard', function () {
    context('quando o cliente faz um agendamento no app mobile', function () {

        const data = {
            costumer: {
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'ramon@televisa.com',
                password: 'pwd123',
                is_provider: true
            }
        }

        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.costumer)

            cy.apiLogin(data.costumer)
            cy.setProviderId(data.provider.email)
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            cy.createAppointment()
        })
    })
})