it('Webapp deve esta online', () => {
    cy.visit('/')

    cy.title().should('eq', 'Samurai Barbershop by QAninja')
})