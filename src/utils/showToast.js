import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export default function showToast(title, description, status) {
  toast({
    position: "top",
    title,
    description,
    status,
    duration: 4000,
    isClosable: true,
  });
}
