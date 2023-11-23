import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export default function showToast(
  title: string,
  description: string,
  status: "info" | "warning" | "success" | "error" | "loading",
): void {
  toast({
    position: "top",
    title,
    description,
    status,
    duration: 800,
    isClosable: false,
  });
}
