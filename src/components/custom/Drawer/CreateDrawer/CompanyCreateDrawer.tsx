import { Button, CloseButton, Drawer, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import api from "../../../../api";
import { queryClient } from "../../../../queryClient";
import { colors } from "../../../../constants/colors";
import type { BaseCompanyForm, FormCompanyError } from "../../../../types/forms/Company";

export default function CompanyDrawer() {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        reset,
        setError
    } = useForm<BaseCompanyForm>({
        defaultValues: {
            company: ""
        }
    });

    const onsubmit: SubmitHandler<BaseCompanyForm> = async (data) => {
        try {
            const res = await api.post('/mayan-admin/create-company', data)
            console.log(res.data)
            reset();
            queryClient.invalidateQueries({ queryKey: ['companies'], exact: true })
        } catch (error) {
            const err = error as AxiosError
            const data = err.response?.data as FormCompanyError
            setError('company', {
                type: "manual",
                message: data.message,
            })
        }
    };

    return (
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button borderRadius={'4xl'} bg={colors.primary} color={'white'}>+Add Company</Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header bg={colors.primary}>
                            <Drawer.Title color={colors.light}>Add New Company</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body bg={colors.light} color={colors.dark}>
                            <form onSubmit={handleSubmit(onsubmit)}>
                                <Field.Root invalid={!!errors.company}>
                                    <Field.Label>Company Name</Field.Label>
                                    <Input
                                        {...register("company", { required: "Company Name is required" })}
                                        placeholder="Enter text here..."
                                    />
                                    {errors.company && <Field.ErrorText>{errors.company.message}</Field.ErrorText>}
                                    {(isSubmitSuccessful && !errors.company) && <Field.HelperText color="green.500">Added Successfully!</Field.HelperText>}
                                </Field.Root>
                            </form>
                        </Drawer.Body>
                        <Drawer.Footer bg={colors.light}>
                            <Stack w={'full'}>
                                <Button
                                    variant={'solid'}
                                    bg={colors.primary}
                                    color={colors.light}
                                    onClick={handleSubmit(onsubmit)}
                                    loading={isSubmitting}
                                >
                                    Save
                                </Button>
                                <Button variant="outline" color={colors.primary} onClick={() => setOpen(false)}>Cancel</Button>
                            </Stack>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton color={colors.light} size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
}