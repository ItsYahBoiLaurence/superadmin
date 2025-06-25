import { Text } from "@chakra-ui/react";
import { useOutlet } from "react-router-dom";

export default function Main() {
    const outlet = useOutlet()
    return (
        <>
            <Text>Mains</Text>
            {outlet}
        </>
    )
}