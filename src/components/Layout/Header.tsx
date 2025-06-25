import { Flex, Image } from "@chakra-ui/react";
import Logo from '../../assets/logo.svg'

export default function Header() {
    return (
        <Flex height={'72px'} px={'24px'} py={'8px'} bg={'#FFFFFF'}>
            <Image
                height={"full"}
                src={Logo}
                padding={'4px'}
            />
        </Flex>
    )
}