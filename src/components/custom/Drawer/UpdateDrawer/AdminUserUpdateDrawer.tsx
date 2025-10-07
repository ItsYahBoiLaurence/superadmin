import { Button, CloseButton, Drawer, Field, Flex, Input, Portal } from "@chakra-ui/react";
import { UserManagementStore } from "../../../../store";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { AdminUsers } from "../../../../types/admin-users";

export default function AdminUserUpdateDrawer() {

    const currentUserToEdit = UserManagementStore(state => state.currentUserToEdit)
    const { openSideBar, toggle, updateUser } = UserManagementStore()
    const { register, handleSubmit, reset, formState: { isLoading } } = useForm({
        defaultValues: {
            id: "",
            email: "",
            first_name: "",
            last_name: "",
            department: {
                company_id: ""
            }
        },
    })

    useEffect(() => {
        if (currentUserToEdit) reset({
            id: currentUserToEdit.id,
            email: currentUserToEdit.email,
            department: {
                company_id: currentUserToEdit.department.company_id
            },
            first_name: currentUserToEdit.first_name,
            last_name: currentUserToEdit.last_name
        })
    }, [currentUserToEdit, reset])

    function submit(data: AdminUsers) {
        updateUser(data)
        toggle()
    }

    return (
        <Drawer.Root open={openSideBar}>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>

                        <Drawer.Header>
                            <Drawer.Title>User Information</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <form id="update-admin-user-form" onSubmit={handleSubmit(submit)}>
                                <Flex gap={3} direction={'column'}>
                                    <Field.Root>
                                        <Field.Label>
                                            First Name <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input {...register('first_name')} />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>
                                            Last Name <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  {...register('last_name')} />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>
                                            Email <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input {...register('email')} disabled />
                                    </Field.Root>
                                </Flex>
                            </form>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button variant="outline" onClick={toggle}>Cancel</Button>
                            <Button type="submit" form="update-admin-user-form">Save</Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={toggle} />
                        </Drawer.CloseTrigger>

                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}