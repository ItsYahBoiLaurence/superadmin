import { Button, Center, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../../types/forms/LoginForm";
import { PasswordInput } from "../ui/password-input";
import { colors } from "../../constants/colors";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../context/AuthContext";


export default function SignIn() {

    const [loading, setLoading] = useState(false)

    const { login } = useContext(AuthenticationContext)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const submitCreds = (data: LoginForm) => {
        setLoading(true)
        login(data)
        setLoading(false)
    }

    return (
        <Center h={'100vh'} bg={'radial-gradient(circle,rgba(217, 216, 245, 0.77) 0%, rgba(236, 240, 243, 0.63) 100%)'}>
            <Stack p={'16px'} w={'400px'} h={'300px'} justify={'space-around'} >
                <Text textStyle={'4xl'} textAlign={'center'}>
                    Welcome!
                </Text>
                <form onSubmit={handleSubmit(submitCreds)}>
                    <Stack gap={'16px'}>
                        <Field.Root invalid={!!errors.email}>
                            <Field.Label>Email</Field.Label>
                            <Input {...register('email', { required: 'Email is required!' })} placeholder="Enter email here..." border={`1px solid ${colors.primary}`} />
                            {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root invalid={!!errors.password}>
                            <Field.Label>Password</Field.Label>
                            <PasswordInput {...register('password', { required: 'Password is required!' })} border={`1px solid ${colors.primary}`} placeholder="Enter password here..." />
                            {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
                        </Field.Root>
                        <Button bg={colors.primary} loading={loading} type="submit">Submit</Button>
                    </Stack>
                </form>
            </Stack>
        </Center>
    )
}