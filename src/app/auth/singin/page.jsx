"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

const SingingPage = () => {

    const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()); 
    console.log("userdata", userData);

   const { data, error } = await authClient.signIn.email({
    email: userData.email, // required
    password: userData.password, // required
    rememberMe: true,
    callbackURL: "/",
});

    console.log("sing in response", data, error);
    
    

    }
    return (
        <div className="w-1/2 mx-auto mt-20">
            <h2 className="mb-5">please sing in</h2>
            <div>
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>

                    

                    <TextField isRequired type="email">
                        <Label>Email</Label>
                        <Input name="email" placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired type="password">
                        <Label>Password</Label>
                        <Input name="password" placeholder="Enter password" />
                        <Description>
                            Must be 8+ chars with 1 uppercase & 1 number
                        </Description>
                        <FieldError />
                    </TextField>

                    <div className="flex gap-2">
                        <Button type="submit">
                            <Check />
                            Submit
                        </Button>

                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
};

export default SingingPage;