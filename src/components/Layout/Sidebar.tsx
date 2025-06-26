import { Box, Center, Container, Group, Stack, Text } from "@chakra-ui/react";
import { IconAddressBook, IconUser } from '@tabler/icons-react';
import { Link, useLocation, useMatch } from "react-router-dom";

const navLinks = [
    {
        title: "Clients",
        url: "/clients",
        icon: <IconUser style={{ color: '#515977' }} />
    },
    {
        title: "Users",
        url: "/users",
        icon: <IconAddressBook style={{ color: '#515977' }} />
    }
]

const NavLink = ({ datalink }: { datalink: { url: string, icon: React.ReactNode, title: string } }) => {

    const match = useMatch(datalink.url)
    const location = useLocation()
    const isInPath = location.pathname === '/' && datalink.url === '/clients' ? true : false

    return (
        <div style={{ borderRadius: '30px', background: match || isInPath ? '#EEEEF1' : undefined, padding: '8px', display: "flex", justifyContent: 'flex-end', alignItems: 'center' }}>
            <Link to={datalink.url} style={{ width: '100%', height: '100%' }}>
                <Center>
                    <Group align={'Start'} justify={'start'} h={'100%'} w={'100%'}>
                        <Center >
                            {datalink.icon}
                            <Text color={'#515977'}>{datalink.title}</Text>
                        </Center>
                    </Group>
                </Center>
            </Link>
        </div>

    )
}


export default function Sidebar() {

    return (
        <Box bg={'#FFFFFF'} flex={0.15} py={'12px'}>
            <Container>
                <Stack gap={'8px'}>
                    {navLinks.map((datalink, index) => (
                        <NavLink datalink={datalink} key={index} />
                    ))}
                </Stack>
            </Container>
        </Box>
    )
}