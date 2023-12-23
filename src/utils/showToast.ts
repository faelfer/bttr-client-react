import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

interface ToastOptionsProps {
  head: string;
  body?: string;
  type: "info" | "warning" | "success" | "error" | "loading";
}

export default function showToast({
  head,
  body,
  type,
}: ToastOptionsProps): void {
  toast({
    position: "top",
    title: head,
    description: body,
    status: type,
    duration: 500,
    isClosable: false,
  });
}
