import { Button, CloseButton, Drawer, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { colors } from "../../../constants/colors";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { BaseCompanyForm } from "../../../types/forms/Company";

export default function CompanyDrawer() {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<BaseCompanyForm>({
        defaultValues: {
            company: ""
        }
    });

    const onsubmit: SubmitHandler<BaseCompanyForm> = (data) => {
        console.log(data)
        reset();
    };

    return (
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button borderRadius={'4xl'} bg={colors.primary} color={colors.light}>+Add Company</Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header bg={colors.primary}>
                            <Drawer.Title>Add New Company</Drawer.Title>
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