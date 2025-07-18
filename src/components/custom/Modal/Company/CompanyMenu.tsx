import { Menu, Portal } from "@chakra-ui/react";
import { IconDots } from '@tabler/icons-react';
import api from "../../../../api";
import { queryClient } from "../../../../queryClient";
import { toaster } from "../../../ui/toaster";

export default function CompanyMenu({ id }: { id: string }) {

    const deleteCompany = async (id: string) => {
        try {
            const res = await api.delete(`mayan-admin/delete-company?companyId=${id}`)
            queryClient.invalidateQueries({ queryKey: ['companies'], exact: true })
            toaster.create({
                type: 'success',
                description: 'Company deleted successfully',
            })
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <IconDots />
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="new-txt">
                                Edit
                            </Menu.Item>
                            <Menu.Item value="new-file" color={'red'} onClick={() => deleteCompany(id)}>Delete</Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </>
    )
}