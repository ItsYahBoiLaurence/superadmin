import { Avatar, Box, Button, Container, For, Group, Stack, Table, Text } from "@chakra-ui/react";
import { colors } from "../../constants/colors";
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import type { AdminUsers } from "../../types/admin-users";
import { Suspense } from "react";
import Loader from "../custom/Loader/Loading";
import AdminUserCreateDrawer from "../custom/Drawer/AdminUserCreateDrawer";

const tableHeader = [
    'Name', 'Company', 'Actions'
]

const AdminTable = () => {

    const { data } = useQuery<AdminUsers[]>({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const res = await api.get('/mayan-admin/admin-users')
            return res.data
        }
    })

    console.log(data)

    return (
        <Box>
            <Table.ScrollArea rounded="md" height="550px">
                <Table.Root size="lg" stickyHeader >
                    <Table.Header >
                        <Table.Row bg={'#F9FBFC'}>
                            <For each={tableHeader}>
                                {(label, index) => <Table.ColumnHeader key={index} textAlign={'left'} color={colors.dark}>{label}</Table.ColumnHeader>}
                            </For>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body bg={colors.light}>
                        <For each={data} >
                            {({ first_name, email, department, last_name }, index) => (
                                <Table.Row key={index} bg={colors.light} color={colors.primary}>
                                    <Table.Cell border={'none'}>
                                        <Group gap={'12px'}>
                                            <Avatar.Root size={'sm'}>
                                                <Avatar.Fallback name={`${first_name} ${last_name}`} />
                                            </Avatar.Root>
                                            <Stack gap={'0'}>
                                                <Text textStyle={'sm'}>{`${first_name} ${last_name}`}</Text>
                                                <Text textStyle={'xs'}>{email}</Text>
                                            </Stack>
                                        </Group>
                                    </Table.Cell>
                                    <Table.Cell border={'none'} textStyle={'sm'}>{department.company_id}</Table.Cell>
                                    <Table.Cell border={'none'}>
                                        <Group gap={'12px'}>
                                            <IconPencil onClick={() => console.log('Edit')} />
                                            <IconTrash onClick={() => console.log('Delete')} />
                                        </Group>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </For>
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        </Box>
    )
}

export default function Users() {
    return (
        <Container py={'12px'}>
            <Stack gap={'12px'}>
                <Group justify={'space-between'} w={'full'} bg={colors.light} py={'12px'} px={'20px'} borderRadius={'8px'}>
                    <Text color={colors.primary} fontWeight={'700'} textStyle={'lg'} >User Management</Text>
                    {/* <Button bg={colors.primary} color={colors.light} borderRadius={'20px'}>+Add</Button> */}
                    <AdminUserCreateDrawer />
                </Group>
                <Suspense fallback={<Loader />}>
                    <AdminTable />
                </Suspense>
            </Stack>
        </Container >
    )
}