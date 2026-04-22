"use client";

import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";

import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    InputGroup,
} from "@heroui/react";
import {useState} from "react";

const SingingPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {
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


                    <TextField className="w-full max-w-[280px]" name="password">
                        <Label>Password</Label>
                        <InputGroup>
                            <InputGroup.Input
                                className="w-full max-w-[280px]"
                                type={isVisible ? "text" : "password"}
                                value={isVisible ? "87$2h.3diua" : "••••••••"}
                            />
                            <InputGroup.Suffix className="pr-0">
                                <Button
                                    isIconOnly
                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => setIsVisible(!isVisible)}
                                >
                                    {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>
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