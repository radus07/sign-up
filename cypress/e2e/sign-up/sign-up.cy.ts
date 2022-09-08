describe('sign up', () => {
  const user = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.ts',
    password: 'AVeryStrongPassword',
  };

  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('should trigger validation on submit', () => {
    cy.get('[data-cy="signUp"]').click();

    cy.get('mat-error').should('have.length', 4);
  });

  it('should display a snackbar after save', () => {
    cy.get('[data-cy="firstName"]').type(user.firstName);
    cy.get('[data-cy="lastName"]').type(user.lastName);
    cy.get('[data-cy="email"]').type(user.email);
    cy.get('[data-cy="password"]').type(user.password);
    cy.get('[data-cy="signUp"]').click();

    cy.intercept('POST', '/users', user).as('saveUser');

    cy.wait('@saveUser');

    cy.get('snack-bar-container').contains('User have been successfully saved!');
    cy.get('[data-cy="firstName"]').should('be.empty');
    cy.get('[data-cy="lastName"]').should('be.empty');
    cy.get('[data-cy="email"]').should('be.empty');
    cy.get('[data-cy="password"]').should('be.empty');
  });

  it('should display a snackbar after save', () => {
    cy.get('[data-cy="firstName"]').type(user.firstName);
    cy.get('[data-cy="lastName"]').type(user.lastName);
    cy.get('[data-cy="email"]').type(user.email);
    cy.get('[data-cy="password"]').type(user.password);
    cy.get('[data-cy="signUp"]').click();

    cy.intercept('POST', '/users', (req) => {
      req.url = '';
    }).as('saveUser');


    cy.wait('@saveUser');

    cy.get('snack-bar-container').contains('Something went wrong. Please try again!');
    cy.get('[data-cy="firstName"]').should('be.empty');
    cy.get('[data-cy="lastName"]').should('be.empty');
    cy.get('[data-cy="email"]').should('be.empty');
    cy.get('[data-cy="password"]').should('be.empty');
  });

  it('should display invalid password error as it contains First name', () => {
    cy.get('[data-cy="firstName"]').type('First');
    cy.get('[data-cy="password"]').type('FirstPassword');
    cy.get('[data-cy="signUp"]').click();

    cy.get('mat-error').contains('Password should be at least 8 characters, lower and uppercase letters, should not contain First or Last name.');
  });

  it('should display invalid password error as it contains Last name', () => {
    cy.get('[data-cy="lastName"]').type('Last');
    cy.get('[data-cy="password"]').type('LastPassword');
    cy.get('[data-cy="signUp"]').click();

    cy.get('mat-error').contains('Password should be at least 8 characters, lower and uppercase letters, should not contain First or Last name.');
  });

  it('should display invalid email error', () => {
    cy.get('[data-cy="email"]').type('user.email@');
    cy.get('[data-cy="email"]').blur();

    cy.get('mat-error').contains('Email is invalid.');
  });
})
