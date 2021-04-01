import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import EditForm, { EditFormProps } from './EditForm';

export interface EditFormParentProps {
    id: string;
}

const EditFormParent = (props: RouteComponentProps<EditFormParentProps>): JSX.Element => {
    const history = useHistory();
    const state = history.location.state as EditFormProps

    console.log("render form parent");
    return <EditForm firstName={state.firstName} id={state.id}
            lastName={state.lastName} email={state.email} option={state.option} />;
}

export default EditFormParent;