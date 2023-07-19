import { render, screen } from '@testing-library/react';
import { beforeEach, vi } from 'vitest';
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from '../../src/components/NavBar';
import { waitFor } from '@testing-library/react';

vi.mock('@auth0/auth0-react')

describe('Navigation bar component, user NOT authenticated', () => {
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            loginWithRedirect: vi.fn(),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('Check for log in button', async () => {
        render(<NavBar />);

        expect(screen.getByText('Log In')).toBeInTheDocument();
    });

    test('It redirects the user to the Auth0 Universal Login page when the Log In button is pressed', async () => {
        const { loginWithRedirect } = useAuth0();

        render(<NavBar />);
        const loginElement = screen.getByText("Log In");
        loginElement.click();

        await waitFor(() => expect(loginWithRedirect).toHaveBeenCalledTimes(1));
    });
})

describe('Navigation bar component, user authenticated', () => {
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            isLoading: false,
            user: {
                email: 'johndoe@me.com',
                email_verified: true,
                sub: 'google-oauth2|2147627834623744883746',
                name: 'John Doe',
            },
            logout: vi.fn(),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('Check if username is on the screen', async () => {
        render(<NavBar />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    test('Check for log out button', async () => {
        render(<NavBar />);

        const outputElement = screen.getByText('Log Out');
        expect(outputElement).toBeInTheDocument();
    });

    test('It redirects the user to the main page when the Log uot button is pressed', async () => {
        const { logout } = useAuth0();
        render(<NavBar />);

        expect(screen.getByText('Log Out')).toBeInTheDocument();
        const button = screen.getByRole("button");
        button.click();
        
        await waitFor(async() => {
            expect(logout).toHaveBeenCalledTimes(1);
        });
    });
})