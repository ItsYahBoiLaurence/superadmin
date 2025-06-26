import { Avatar, Card, Center, Container, Group, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import api from "../../api";
import type { Company } from "../../types/company";
import { FormatDate } from "../../utils/date-formatter";
import ButtonCompany from '../custom/Drawer/CompanyCreateDrawer'

const ClientCard = () => {

    const { data } = useQuery<Company[]>({
        queryKey: ['companies'],
        queryFn: async () => {
            const res = await api.get('/mayan-admin')
            return res.data
        },
    })

    return (
        <SimpleGrid overflow={'auto'} maxH="calc(100vh - 200px)" columns={3} w={'full'} columnGap="4" rowGap="4">
            {data!.map(({ name, date_created, employee_count }, index) => (
                <Card.Root key={index} bg={'white'} border={'none'}>
                    <Card.Body gap="2" textAlign={'center'}>
                        <Avatar.Root size="2xl" shape="rounded" mx={'auto'}>
                            <Avatar.Fallback name={name} />
                        </Avatar.Root>
                        <Card.Title mt="2" color={'#515977'}>{name}</Card.Title>
                        <Card.Description>
                            Member since {FormatDate(date_created)}
                        </Card.Description>
                        <Card.Description >
                            {employee_count} Employees
                        </Card.Description>
                    </Card.Body>
                </Card.Root>
            ))}
        </SimpleGrid>
    )
}



export default function Clients() {
    return (
        <Container py={'12px'}>
            <Stack gap={'20px'}>
                <Group justify={'end'} w={"full"}>
                    <ButtonCompany />
                </Group>
                <Suspense fallback={<Center w={'100%'} h="100%"><Spinner color="teal.500" size="lg" /></Center>}>
                    <ClientCard />
                </Suspense>
            </Stack>
        </Container>
    )
}