describe('Landing Page Tests', () => {
  it('should load the Weather App after clicking the button', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.contains('Welcome to the Weather App').should('be.visible');

    cy.get('#load-weather-app').click();

    cy.get('iframe').should('be.visible');
    cy.get('iframe').should('have.attr', 'src', 'http://localhost:5173/');

    cy.get('#load-weather-app').should('not.be.visible');
  });

  it('should display the button when the page loads', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.get('#load-weather-app').should('be.visible');
  });

  it('should not display iframe before clicking the button', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.get('iframe').should('not.exist');
  });

  it('should display iframe with correct source after clicking the button', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.get('#load-weather-app').click();

    cy.get('iframe').should('have.attr', 'src', 'http://localhost:5173/');
  });
});
