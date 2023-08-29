import { describe, test, expect } from 'vitest'
import currenciesSlice, { getCurrencies, } from './currenciesSlice'
import createFetchMock from 'vitest-fetch-mock';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('currenciesSlice tests', () => {
  const initialState = {
    "publicationDate": "2023-07-16T12:58:25.7759293Z",
    "items": [
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

  test('test getCurrencies reducer', async () => {
    const testState = {
      "name": "US Dollar",
      "code": "USD",
      "unit": 1,
      "purchasePrice": 3.7327,
      "sellPrice": 3.7373,
      "averagePrice": 3.735
    };

    const afterReducerOperation = currenciesSlice(
      initialState,
      getCurrencies()
    );

    expect(afterReducerOperation.items[0]).toEqual(testState);
  });

  test('test getCurrencies fetch', async () => {
    const fetchMock = fetch.mockResponseOnce('http://webtask.future-processing.com:8068/currencies', { status: 200 });
    const dispatch = vi.fn();
    const action = getCurrencies(initialState);

    await action(dispatch);
    expect(fetchMock).toHaveBeenCalledWith('http://webtask.future-processing.com:8068/currencies');
  });

})