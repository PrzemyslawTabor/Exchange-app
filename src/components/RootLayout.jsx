import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import CurrenciesGrid from '../features/currencies/grids/CurrenciesGrid';
import WalletGrid from '../features/currencies/grids/WalletGrid';
import CreateInitialWalletButton from '../features/currencies/initial/CreateInitialWalletButton';
import { getWallet } from '../store/walletSlice';
import AuthenticationButton from '../features/authentication/AuthenticationButton';

const RootLayout = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const dispatch = useDispatch();
    const {wallet} = useSelector((state) => state.wallet);

    useEffect(() => {
      const dataFetchWallet = async () => {
        await Promise.all([
          dispatch(getWallet({userId: user.sub}))
        ]);
      }

      if (isAuthenticated) {
        dataFetchWallet();
      }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        if (isLoading) {
            return (
                <div className='mt-5'>
                    <p>We are loading your data. Please hold on.</p>
                </div>
            )
        }

        return (
            <div className='mt-5'>
                <p>You need to login first to get the access to the site.</p>
                <AuthenticationButton />
            </div>
        )
    }

    if (wallet.userId === null) {
        return (
            <div className='mt-5'>
                <p>You did not define your initial wallet yet. It is necessary to use this site.</p>
                <CreateInitialWalletButton />
            </div>
        )
    }

    return (
        <div className="d-flex justify-content-between">
            <CurrenciesGrid />
            <WalletGrid userId={user.sub}/>
        </div>
    )
};

export default RootLayout;