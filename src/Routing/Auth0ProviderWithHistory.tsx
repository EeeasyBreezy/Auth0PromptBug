import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { AppState, Auth0Provider } from '@auth0/auth0-react';

interface Props {
    children?: ReactNode;
}

const authProviderSettings = {
    domain: '',
    clientId: '',
    redirectUri: window.location.origin,
    audience: '',
};


const Auth0ProviderWithHistory = ({ children }: Props) => {
    const history = useHistory();

    const onRedirectCallback = (appState: AppState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Auth0Provider {...authProviderSettings} onRedirectCallback={onRedirectCallback}>
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
