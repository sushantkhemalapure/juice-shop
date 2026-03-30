describe('/#/track-order', () => {
  describe('challenge "reflectedXss"', () => {
    it('Order Id should be susceptible to reflected XSS attacks', () => {
      cy.task('isDocker').then((isDocker) => {
        if (!isDocker) {
          const xssPayload = '<iframe src="javascript:alert(`xss`)">'

          cy.visit('/#/track-result')
          cy.visit(`/#/track-result?id=${encodeURIComponent(xssPayload)}`)

          cy.get('app-track-result h1 code iframe')
            .should('exist')
            .and('have.attr', 'src', 'javascript:alert(`xss`)')

          cy.expectChallengeSolved({ challenge: 'Reflected XSS' })
        }
      })
    })
  })
})
