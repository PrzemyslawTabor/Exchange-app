import { screen, act } from '@testing-library/react';
import CurrenciesGrid from './CurrenciesGrid';
import { renderWithProviders } from '../../../store/renderWithProviders';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event'

const mockedNavigator = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
      ...actual,
      useNavigate: () => mockedNavigator,
    }
  })

describe('Currencies Grid component', () => {
    const initialState = {
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
                {
                    "name": "Swiss Franc",
                    "code": "CHF",
                    "unit": 1,
                    "purchasePrice": 3.8607,
                    "sellPrice": 3.8714,
                    "averagePrice": 3.866
                },
                {
                    "name": "Russian ruble",
                    "code": "RUB",
                    "unit": 100,
                    "purchasePrice": 7.4081,
                    "sellPrice": 7.4243,
                    "averagePrice": 7.4162
                },
                {
                    "name": "Czech koruna",
                    "code": "CZK",
                    "unit": 100,
                    "purchasePrice": 14.4515,
                    "sellPrice": 14.4773,
                    "averagePrice": 14.4644
                },
                {
                    "name": "Pound sterling",
                    "code": "GBP",
                    "unit": 1,
                    "purchasePrice": 5.8362,
                    "sellPrice": 5.8543,
                    "averagePrice": 5.8453
                }
            ]
        }
    }

    test('renders currencies if request succeeds', async () => {
        const { store } = renderWithProviders(<CurrenciesGrid />, {
            preloadedState: {
                currencies: initialState
            }
        });

        const listItemElements = await screen.getAllByTestId("list-item");
        expect(listItemElements).not.toHaveLength(0);
    })

    test('renders currencies before store fetches data', async () => {
        const { store } = renderWithProviders(<CurrenciesGrid />, {
            preloadedState: {
                currencies: {
                    isLoading: true,
                }
            }
        });

        const listItemElements = await screen.getByText("Loading data. Hold on.");
        expect(listItemElements).toBeInTheDocument();
    })

    test('check for table headers', async () => {
        const { store } = renderWithProviders(<CurrenciesGrid />, {
            preloadedState: {
                currencies: initialState
            }
        });

        expect(screen.getByText("Currency")).toBeInTheDocument();
        expect(screen.getByText("Unit")).toBeInTheDocument();
        expect(screen.getByText("Values")).toBeInTheDocument();
        expect(screen.getByText("Actions")).toBeInTheDocument();
    })

    test('check if last update date exist', async () => {
        const { store } = renderWithProviders(<CurrenciesGrid />, {
            preloadedState: {
                currencies: initialState
            }
        });

        const state = store.getState();
        const date = new Date(state.currencies.currencies.publicationDate).toString();;
        expect(screen.getByText("Last update: " + date)).toBeInTheDocument();
    })

    test('check if sell price is .00', async () => {
        const { store } = renderWithProviders(<CurrenciesGrid />, {
            preloadedState: {
                currencies: initialState
            }
        });

        const state = store.getState();
        const sellPrice = state.currencies.currencies.items[0].sellPrice;
        expect(screen.getByText(sellPrice.toFixed(2))).toBeInTheDocument();
    })

    test('navigate to buy currencies window on click', async () => {
        const { store } = renderWithProviders(<CurrenciesGrid />, {
            preloadedState: {
                currencies: initialState
            }
        });

        const button = screen.getAllByRole("button", {
            name: /Buy/i,
        });

        expect(button[0]).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(button[0]);
            expect(mockedNavigator).toHaveBeenCalled();
        })        
    })
})