import { Flex } from "@chakra-ui/react";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import Main from "../../components/layout/Main";


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