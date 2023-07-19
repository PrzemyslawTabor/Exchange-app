import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './AuthNav';
import CurrenciesGrid from './CurrenciesGrid';
import WalletGrid from './WalletGrid';
import CreateInitialWalletButton from './CreateInitialWalletButton';
import { getWallet } from '../store/walletSlice';

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

    return (
        <>
            {!isAuthenticated && !isLoading && (
                <div className='mt-5'>
                    <p>You need to login first to get the access to the site.</p>
                    <LoginButton />
                </div>
            )}
            {isLoading && (
                <div className='mt-5'>
                    <p>We are loading your data. Please hold on.</p>
                </div>
            )}
            {isAuthenticated && wallet.userId === null && (
                <div className='mt-5'>
                    <p>You did not define your initial wallet yet. It is necessary to use this site.</p>
                    <CreateInitialWalletButton />
                </div>
            )}
            {isAuthenticated && wallet.userId !== null && (
                <div className="d-flex justify-content-between">
                    <CurrenciesGrid />
                    <WalletGrid userId={user.sub}/>
                </div>
            )}
            
        </>
    );
};

export default RootLayout;