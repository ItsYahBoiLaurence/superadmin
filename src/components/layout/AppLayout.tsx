import { Button, Box, Center, Container, Group, Stack, Text, Image, Flex } from "@chakra-ui/react";
import { IconAddressBook, IconUser } from '@tabler/icons-react';
import { Link, useLocation, useMatch } from "react-router-dom";
import { useOutlet } from "react-router-dom";
import Logo from '../../assets/logo.svg'
import { IconLogout } from '@tabler/icons-react';
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthContext";
import { colors } from "../../constants/colors";

export function Header() {
    const { logout } = useContext(AuthenticationContext)
    return (
        <Flex height={'72px'} px={'24px'} py={'8px'} bg={'#FFFFFF'} justify={'space-between'} align={'center'}>
            <Image
                height={"full"}
                src={Logo}
                padding={'4px'}
            />
            <Button borderRadius={'20px'} bg={colors.secondary} onClick={logout} color={colors.dark}>Logout <IconLogout /></Button>
        </Flex>
    )
}

export function Main() {
    const outlet = useOutlet()
    return (
        <Box bg={'#F7F8FA'} flex={0.85} p={'12px'}>
            {outlet}
        </Box>
    )
}

export function Sidebar() {
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

export default function Layout() {
    return (
        <Flex direction={'column'} style={{ boxSizing: 'border-box' }}>
            <Header />
            <Flex justifyContent={'flex-start'} h="calc(100vh - 72px)">
                <Sidebar />
                <Main />
            </Flex>
        </Flex>
    )
}