import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";


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