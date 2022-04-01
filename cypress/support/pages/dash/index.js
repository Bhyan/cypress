import { el } from './elements'
import header from '../../components/header'

class DashPage {
    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 })
            .should('be.visible')
    }

    selectDay(appointmentDate) {

        let today = new Date()
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        if (today.getDate() === lastDayOfMonth.getDate()) {
            cy.get(el.nextMonthButton)
                .should('be.visible')
                .click()

            const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ]

            cy.contains(el.monthYearName, monthNames[appointmentDate.getMonth()])
                .should('be.visible')

            cy.wait(1000)
        }

        const target = new RegExp('^' + appointmentDate.getDate() + '$', 'g')

        cy.contains(el.boxDay, appointmentDate.getDate())
            .click()
    }

    appointmentShouldBe(customer, hour) {
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour)
            .should('be.visible')
    }
}

export default new DashPage()