import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Button, MenuItem, Select } from '@material-ui/core';
import { Link, useHistory, Prompt } from 'react-router-dom';
import * as yup from 'yup';

export interface EditFormProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    option:string;
}

function EditForm(initial: EditFormProps): JSX.Element {
    const schema = yup.object().shape({
        firstName: yup.string().required()
            .min(10, 'too short')
            .max(20, 'too long'),
        lastName: yup.string().required(),
        email: yup.string().required(),
    });
    const history = useHistory();

    const submitHandler = (values: EditFormProps | null, { setSubmitting }: FormikHelpers<any>) => {
        alert("form submitted");
        setSubmitting(false);
        history.push('/');
    }
    console.log("render form");
    return (
        <>
            <Formik validationSchema={schema} onSubmit={submitHandler} initialValues={initial}>
                        <Form>
                            <Prompt when message={"Changes gonna be lost"} />
                            <Field name="firstName" placeholder="First name" type="text" />
                            <Field name="lastName" type="text" placeholder="Last name" />
                            <Field name="email" type="text" placeholder="Email" />
                            <Select name="option">
                                <MenuItem value="1">Option 1</MenuItem>
                                <MenuItem value="2">Option 2</MenuItem>
                                <MenuItem value="3">Option 3</MenuItem>
                            </Select>
                            <Button type="submit">Submit button</Button>
                            <Button onClick={(event) => {
                                history.goBack();}} type="button">Back</Button>
                        </Form>
            </Formik>
            <Link to={"/non_save_location"}>Do not sumbit link</Link>
        </>
    )
};

export default EditForm;