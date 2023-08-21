import App from '../../App';
import Auth0ProviderWithHistory from './Auth0ProviderWithHistory';
import { Provider } from 'react-redux';
import store from "../../store/store";

const Providers = () => {
    return (
        <>
            <Auth0ProviderWithHistory>
                <Provider store={store}>
                    <App />
                </Provider>
            </Auth0ProviderWithHistory>
        </>
    )
};
  
export default Providers;