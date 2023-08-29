import { screen, act } from '@testing-library/react';
import { renderWithProviders } from '../../../store/renderWithProviders';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event'
import WalletGrid from './WalletGrid';

const mockedNavigator = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
      ...actual,
      useNavigate: () => mockedNavigator,
    }
  })

describe('Wallet Grid component', () => {
    const initialCurrenciesState = {
        currencies: {
            publicationDate: "2023-07-16T12:58:25.7759293Z",
            items: [
                {
                    "name": "US Dollar",
                    "code": "USD",
                    "unit": 1,
                    "purchasePrice": 3.7327,
                    "sellPrice": 3.7373,
                    "averagePrice": 3.735
                },
                {
                    "name": "Euro",
                    "code": "EUR",
                    "unit": 1,
                    "purchasePrice": 3.9214,
                    "sellPrice": 3.9379,
                    "averagePrice": 3.9296
                },
            ]
        }
    }

    const initialWalletState = {
        wallet: {
            userId: "google-oauth2|2147627834623744883746",
            availableMoney: 111,
            USD: 1,
            EUR: 2,
        }
    }

    test('renders wallet if request succeeds', async () => {
        const { store } = renderWithProviders(<WalletGrid />, {
            preloadedState: {
                currencies: initialCurrenciesState,
                wallet: initialWalletState
            }
        });

        const listItemElements = await screen.getAllByTestId("list-item");
        expect(listItemElements).not.toHaveLength(0);
    })

    test('check for component title', async () => {
        const { store } = renderWithProviders(<WalletGrid />, {
            preloadedState: {
                currencies: initialCurrenciesState,
                wallet: initialWalletState
            }
        });

        expect(screen.getByText("My Wallet")).toBeInTheDocument();
    })

    test('check for table headers', async () => {
        const { store } = renderWithProviders(<WalletGrid />, {
            preloadedState: {
                currencies: initialCurrenciesState,
                wallet: initialWalletState
            }
        });

        expect(screen.getByText("Currency")).toBeInTheDocument();
        expect(screen.getByText("Unit price")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();
        expect(screen.getByText("Value")).toBeInTheDocument();
        expect(screen.getByText("Actions")).toBeInTheDocument();
    })

    test('renders wallet before store fetches data', async () => {
        const { store } = renderWithProviders(<WalletGrid />);
        expect(screen.getByText("Loading data. Hold on.")).toBeInTheDocument();
    })

    test('check if available exist and .00', async () => {
        const { store } = renderWithProviders(<WalletGrid />, {
            preloadedState: {
                currencies: initialCurrenciesState,
                wallet: initialWalletState
            }
        });

        const state = store.getState();
        const availableMoney = state.wallet.wallet.availableMoney;
        expect(screen.getByText("Available: " + availableMoney.toFixed(2) + " PLN")).toBeInTheDocument();
    })

    test('check if value is .00', async () => {
        const { store } = renderWithProviders(<WalletGrid />, {
            preloadedState: {
                currencies: initialCurrenciesState,
                wallet: initialWalletState
            }
        });

        const state = store.getState();
        const value = state.currencies.currencies.items[1].purchasePrice * state.wallet.wallet.EUR;
        expect(screen.getByText(value.toFixed(2))).toBeInTheDocument();
    })

    
    test('navigate to sell currencies window on click', async () => {
        const { store } = renderWithProviders(<WalletGrid />, {
            preloadedState: {
                currencies: initialCurrenciesState,
                wallet: initialWalletState
            }
        });

        const button = screen.getAllByRole("button", {
            name: /Sell/i,
        });

        expect(button[0]).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(button[0]);
            expect(mockedNavigator).toHaveBeenCalled();
        })        
    })

})