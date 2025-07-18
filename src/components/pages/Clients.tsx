import { Avatar, Box, Card, Container, Group, SimpleGrid, Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Suspense } from "react";
import api from "../../api";
import type { Company } from "../../types/company";
import { FormatDate } from "../../utils/date-formatter";
import ButtonCompany from '../custom/Drawer/CreateDrawer/CompanyCreateDrawer'
import Loader from "../custom/Loader/Loading";
import CompanyMenu from "../custom/Modal/Company/CompanyMenu";

const ClientCard = () => {

    const { data } = useQuery<Company[]>({
        queryKey: ['companies'],
        queryFn: async () => {
            const res = await api.get('/mayan-admin/company')
            return res.data
        },
    })

    console.log(data)

    return (
        <SimpleGrid overflow={'auto'} maxH="calc(100vh - 200px)" columns={3} w={'full'} columnGap="4" rowGap="4">
            {data!.map(({ id, name, date_created, employee_count }, index) => (
                <Card.Root key={index} bg={'white'} border={'none'}>
                    <Box display={'flex'} justifyContent={'end'} alignItems={'end'} paddingTop={'2'} paddingRight={'2'}>
                        <CompanyMenu id={id} />
                    </Box>
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
            ))
            }
        </SimpleGrid >
    )
}

export default function Clients() {
    return (
        <Container py={'12px'}>
            <Stack gap={'20px'}>
                <Group justify={'end'} w={"full"}>
                    <ButtonCompany />
                </Group>
                <Suspense fallback={<Loader />}>
                    <ClientCard />
                </Suspense>
            </Stack>
        </Container>
    )
}