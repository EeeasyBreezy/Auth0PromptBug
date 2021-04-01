import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
import { Action, Location } from 'history';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export interface ConfirmationBlockDialogProps {
    when: boolean;
    navigate: (path: string) => void;
    isNavigationBlocked: (path: Location) => boolean;
    approveOption: string;
    cancelOption: string;
    message:string;
}

function ConfirmationBlockingDialog(props: ConfirmationBlockDialogProps): JSX.Element {
    const { when, navigate, isNavigationBlocked, approveOption, cancelOption, message } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [lastLocation, setLastLocation] = useState<Location | undefined>(undefined);
    const [doNavigate, setDoNavigate] = useState<boolean>(false);


    const messageCallback = (nextLocation: Location, action: Action): string | boolean => {
        if (!doNavigate && isNavigationBlocked(nextLocation)) {
            setOpen(true);
            setLastLocation(nextLocation);
            return false;
        }
        return true;
    }
    useEffect(() => {
        if(doNavigate && lastLocation) {
            navigate(lastLocation.pathname);
        }
    }, [doNavigate, lastLocation])
    const closeHandler = () => {
        setOpen(false);
    }
    const approveNavigationHandler = () => {
        setOpen(false);
        setDoNavigate(true);
    }
    return (
        <React.Fragment>
            <Prompt message={messageCallback} when={when}/>
            <Dialog open={open} 
                disableEscapeKeyDown
                onClose={closeHandler}
            >
                <DialogContent>{message}</DialogContent>
                <DialogActions>
                    <Button onClick={approveNavigationHandler}>{approveOption}</Button>
                    <Button onClick={closeHandler}>{cancelOption}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ConfirmationBlockingDialog;