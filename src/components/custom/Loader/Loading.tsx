import { Center, Spinner } from "@chakra-ui/react";
import { colors } from "../../../constants/colors";

export default function Loader() {
    return (
        <Center w={'100%'} h="100%" pos={'relative'}><Spinner color={colors.primary} size="lg" /></Center>
    )
}