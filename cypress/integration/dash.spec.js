import dash from '../support/pages/dash'
import { costumer, provider, appointment } from '../support/factories/dash'


describe('Dashboard', function () {
    context('quando o cliente faz um agendamento no app mobile', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(costumer)

            cy.apiLogin(costumer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            cy.uiLogin(provider)

            dash.calendarShouldBeVisible()
            dash.selectDay(Cypress.env('appointmentDate'))
            dash.appointmentShouldBe(costumer, appointment.hour)
        })
    })
})