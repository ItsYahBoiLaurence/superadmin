import { Box } from "@chakra-ui/react";
import { useOutlet } from "react-router-dom";

export default function Main() {
    const outlet = useOutlet()
    return (
        <Box bg={'#F7F8FA'} flex={0.85} p={'12px'}>
            {outlet}
        </Box>
    )
}