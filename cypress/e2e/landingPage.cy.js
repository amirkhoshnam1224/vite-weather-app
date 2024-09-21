it('should load the Weather App after clicking the button', () => {
  cy.visit('http://127.0.0.1:5500/index.html');

  cy.get('#load-weather').contains('Load Weather App');

  cy.get('#load-weather').click();

  cy.get('iframe').should('be.visible');
  
  cy.get('iframe').should('have.attr', 'src', 'http://localhost:3000/');

  cy.get('#load-weather').should('not.exist');
});
