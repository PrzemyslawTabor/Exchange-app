import { screen, waitFor } from '@testing-library/react';
import { beforeEach, vi } from 'vitest';
import { useAuth0 } from "@auth0/auth0-react";
import RootView from './RootView';
import { renderWithProviders } from '../store/renderWithProviders';
import { act } from 'react-dom/test-utils';
import { getWallet, testGetWallet, testUpdateWalletReducer } from '../store/walletSlice';

vi.mock('@auth0/auth0-react')

describe('Root layout component, user not authenticated', () => {
    beforeEach(() => {
        useAuth0.mockReturnValue({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
    });

    test('User NOT authenticated, page still loading', async () => {
        const { store } = renderWithProviders(<RootView />);

        const outputElement = screen.getByText('You need to login first to get the access to the site.');
        expect(outputElement).toBeInTheDocument();
    });

    test('User NOT authenticated and no wallet', async () => {
        await act(async () => {
            useAuth0.mockReturnValue({
                isLoading: true,
            });
        });

        const { store } = renderWithProviders(<RootView />);
        const outputElement = screen.getByText('We are loading your data. Please hold on.');
        expect(outputElement).toBeInTheDocument();
    })
})

describe('User authenticated', async () => {
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user: {
                email: 'johndoe@me.com',
                email_verified: true,
                sub: 'google-oauth2|2147627834623744883746',
            },
        });
    });

    test('User authenticated, wallet for user NOT exist', async () => {
        await act(async () => {
            const { store } = renderWithProviders(<RootView />);
        });

        const outputElement = screen.getByText('You did not define your initial wallet yet. It is necessary to use this site.');
        expect(outputElement).toBeInTheDocument();
    });
})
