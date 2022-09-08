describe('sign up', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('should trigger validation on submit', () => {
    cy.get('button').first().click();

    cy.get('mat-error').should('have.length', 4);
  });

  it('should display a snackbar after save', function () {
    const user = {
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.ts',
      password: 'AVeryStrongPassword',
    }
    cy.get('input[formControlName=firstName]').type(user.firstName);
    cy.get('input[formControlName=lastName]').type(user.lastName);
    cy.get('input[formControlName=email]').type(user.email);
    cy.get('input[formControlName=password]').type(user.password);
    cy.get('button').first().click();

    cy.intercept('POST', '/users', user).as('saveUser');

    cy.wait('@saveUser');

    cy.get('snack-bar-container').contains('User have been successfully saved!');
    cy.get('input[formControlName=firstName]').should('be.empty');
    cy.get('input[formControlName=lastName]').should('be.empty');
    cy.get('input[formControlName=email]').should('be.empty');
    cy.get('input[formControlName=password]').should('be.empty');
  });

  it('should display a snackbar after save', function () {
    const user = {
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.ts',
      password: 'AVeryStrongPassword',
    }
    cy.get('input[formControlName=firstName]').type(user.firstName);
    cy.get('input[formControlName=lastName]').type(user.lastName);
    cy.get('input[formControlName=email]').type(user.email);
    cy.get('input[formControlName=password]').type(user.password);
    cy.get('button').first().click();

    cy.intercept('POST', '/users', (req) => {
      req.url = '';
    }).as('saveUser');


    cy.wait('@saveUser');

    cy.get('snack-bar-container').contains('Something went wrong. Please try again!');
    cy.get('input[formControlName=firstName]').should('be.empty');
    cy.get('input[formControlName=lastName]').should('be.empty');
    cy.get('input[formControlName=email]').should('be.empty');
    cy.get('input[formControlName=password]').should('be.empty');
  });

  it('should display invalid password error as it contains First name', function () {
    cy.get('input[formControlName=firstName]').type('First');
    cy.get('input[formControlName=password]').type('FirstPassword');
    cy.get('button').first().click();

    cy.get('mat-error').contains('Password should be at least 8 characters, lower and uppercase letters, should not contain First or Last name.');
  });

  it('should display invalid password error as it contains Last name', function () {
    cy.get('input[formControlName=lastName]').type('Last');
    cy.get('input[formControlName=password]').type('LastPassword');
    cy.get('button').first().click();

    cy.get('mat-error').contains('Password should be at least 8 characters, lower and uppercase letters, should not contain First or Last name.');
  });

  it('should display invalid email error', function () {
    cy.get('input[formControlName=email]').type('user.email@');
    cy.get('input[formControlName=email]').blur();

    cy.get('mat-error').contains('Email is invalid.');
  });
})
