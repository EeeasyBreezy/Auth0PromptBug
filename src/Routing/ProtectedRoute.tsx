import React, { FC } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Route, RouteProps } from 'react-router-dom';
import { Spinner, SpinnerSize } from '@fluentui/react';

interface Props extends RouteProps {
    allowedRoles?: string[];
}

const LoadingOverlay: FC = () => (
    <Spinner
        styles={{
            root: {
                position: 'absolute',
                width: '100%',
                height: '100%',
            },
        }}
        size={SpinnerSize.large}
    />
);


const ProtectedRoute: FC<Props> = ({ allowedRoles, component, ...args }: Props) => {

    let componentToUse = component;

    const onRedirect = (): JSX.Element => {
        return <LoadingOverlay />
    }

    const wrappedComponent = componentToUse
        ? withAuthenticationRequired(componentToUse,  { onRedirecting: onRedirect })
        : componentToUse;

    return <Route {...args} component={wrappedComponent} />;
};

export default ProtectedRoute;
