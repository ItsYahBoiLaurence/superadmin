import { Button, Flex, Image, Menu, Portal } from "@chakra-ui/react";
import Logo from '../../assets/logo.svg'
import { IconLogout } from '@tabler/icons-react';
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthContext";
import { colors } from "../../constants/colors";

export default function Header() {
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