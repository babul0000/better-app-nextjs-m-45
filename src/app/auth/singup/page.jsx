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


const SingUpPage = () => {

    const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries()); 
    console.log("userdata", userData);

    const { data, error } = await authClient.signUp.email({
    name: userData.name, // required
    email: userData.email, // required
    password: userData.password, // required
    callbackURL: "/",
});

    
console.log(data, error);

if(error) {
    alert("error singing up" + error.message);
}
if(data) {
    alert(" singing up successfully");
}
    }

    return (
        <div>
            <h1>Sign Up</h1>

            <div className="w-1/2 mx-auto">
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>

                    <TextField isRequired>
                        <Label>Name</Label>
                        <Input name="name" placeholder="John Doe" />
                        <FieldError />
                    </TextField>

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


// hello
export default SingUpPage;