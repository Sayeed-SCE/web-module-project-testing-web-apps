import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);


});

test('renders the contact form header', () => {
    render (<ContactForm />);

    const header = screen.queryByText(/contact form/i);

    expect (header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect (header).toHaveTextContent(/contact form/i);

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, "1234");

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
   
    render (<ContactForm />);

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    
    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId("error");
        expect(errorMessages).toHaveLength(3);
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

    render(<ContactForm />);

    const firstNameField = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameField, "sayeed" );

    const lastNameField = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameField, "BloomT" );

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

    render(<ContactForm />);

    const emailField = screen.getByLabelText(/email*/i);
    userEvent.type(emailField, 'sayeed@gmail');

    const errorMessages = await screen.findByText(/Error: email must be a valid email address./i);
    expect(errorMessages).toBeInTheDocument();

});
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const errrorMessage = await screen.findByText(/lastName is a required field./i);
    expect(errrorMessage).toBeInTheDocument();

});

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

// });

// test('renders all fields text when all fields are submitted.', async () => {

// });