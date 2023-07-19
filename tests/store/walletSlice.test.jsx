import { describe, test, expect, vi } from 'vitest'
import walletSlice, { createWallet, getWallet, updateWallet } from '../../src/store/walletSlice';
import createFetchMock from 'vitest-fetch-mock';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('walletSlice tests', () => {
    const data = {
        wallet: {
            userId: "google-oauth2|2147627834623744883746",
            availableMoney: 1111,
            USD: 1,
            EUR: 2,
            CHF: 3,
            RUB: 4,
            CZK: 5,
            GBP: 6,
        },
    };

    afterEach(() => {
        fetchMocker.mockClear();
    });

    test('test getWallet reducer', async () => {
        const afterReducerOperation = walletSlice(
            data,
            getWallet()
        );

        expect(afterReducerOperation).toEqual(data);
    });

    test('test updateWallet reducer', async () => {
        const updateData = {
            wallet: {
                userId: "google-oauth2|2147627834623744883746",
                availableMoney: 1111,
                USD: 111,
                EUR: 222,
                CHF: 333,
                RUB: 444,
                CZK: 555,
                GBP: 666,
            },
        };

        const afterReducerOperation = walletSlice(
            updateData,
            updateWallet()
        );

        expect(afterReducerOperation).toEqual(updateData);
    });

    
    test('test createWallet reducer', async () => {
        const afterReducerOperation = walletSlice(
            data,
            createWallet()
        );

        expect(afterReducerOperation).toEqual(data);
    });


    test('test updateWallet fetch', async () => {
        const fetchMock = fetch.mockResponseOnce('http://127.0.0.1:8080/wallet/update', { status: 200 });
        const dispatch = vi.fn();
        const action = updateWallet(data);

        await action(dispatch);
        expect(fetchMock).toHaveBeenCalledWith('http://127.0.0.1:8080/wallet/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data}),
        });
    });

    test('test createWallet reducer', async () => {
        const fetchMock = fetch.mockResponseOnce('http://127.0.0.1:8080/wallet/create', { status: 200 });
        const dispatch = vi.fn();
        const action = createWallet(data);

        await action(dispatch);
        expect(fetchMock).toHaveBeenCalledWith('http://127.0.0.1:8080/wallet/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data}),
        });
    });
})