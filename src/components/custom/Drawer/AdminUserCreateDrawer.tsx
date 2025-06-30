import { Button, CloseButton, Drawer, Field, Input, NativeSelect, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { colors } from "../../../constants/colors";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { AdminUserForm } from "../../../types/forms/AdminUsers";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api";

export default function AdminUserCreateDrawer({ companyData }: { companyData: [] }) {
    const [open, setOpen] = useState(false);

    const onsubmit: SubmitHandler<AdminUserForm> = async (data) => {
        console.log(data)
        try {
            const res = await api.post('/mayan-admin/inviteAdmin', data)
            reset()
            return res.data
        } catch (error) {
            console.log(error)
        }
        reset();
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
        reset,
        watch
    } = useForm<AdminUserForm>({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            company: "",
            department: ""
        }
    });

    const selectedCompany = watch('company')

    const { data } = useQuery<string[]>({
        queryKey: ['departmentData', selectedCompany],
        queryFn: async () => {
            const res = await api.get(`/mayan-admin/department?company=${selectedCompany}`)
            return res.data
        },
        enabled: !!selectedCompany
    })

    return (
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button borderRadius={'4xl'} bg={colors.primary} color={colors.light}>+Add</Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header bg={colors.primary}>
                            <Drawer.Title>Add new Admin User</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body bg={colors.light} color={colors.dark}>
                            <form onSubmit={handleSubmit(onsubmit)}>
                                <Stack gap={'12px'}>
                                    <Field.Root invalid={!!errors.first_name}>
                                        <Field.Label>First Name</Field.Label>
                                        <Input
                                            {...register("first_name", { required: "First Name is Required!" })}
                                            placeholder="Enter text here..."
                                        />
                                        {errors.first_name && <Field.ErrorText>{errors.first_name.message}</Field.ErrorText>}
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.last_name}>
                                        <Field.Label>Last Name</Field.Label>
                                        <Input
                                            {...register("last_name", { required: "Last Name is required" })}
                                            placeholder="Enter text here..."
                                        />
                                        {errors.last_name && <Field.ErrorText>{errors.last_name.message}</Field.ErrorText>}
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.email}>
                                        <Field.Label>Email</Field.Label>
                                        <Input
                                            {...register("email", { required: "Email is required" })}
                                            placeholder="Enter text here..."
                                        />
                                        {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.company}>
                                        <Field.Label>Company</Field.Label>
                                        <NativeSelect.Root>
                                            <NativeSelect.Field
                                                {...register("company", { required: "Company Name is required" })}
                                                placeholder="Select option"
                                            >
                                                {companyData.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                        {errors.company && <Field.ErrorText>{errors.company.message}</Field.ErrorText>}
                                    </Field.Root>
                                    <Field.Root disabled={data!.length > 0 ? false : true} invalid={!!errors.department}>
                                        <Field.Label>Department</Field.Label>
                                        <NativeSelect.Root>
                                            <NativeSelect.Field
                                                {...register("department", { required: "Department Name is required" })}
                                                placeholder="Select option"
                                            >
                                                {data!.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                        {errors.department && <Field.ErrorText>{errors.department.message}</Field.ErrorText>}
                                        {(isSubmitSuccessful) && <Field.HelperText color="green.500">Invited Successfully!</Field.HelperText>}
                                    </Field.Root>
                                </Stack>
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
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
}