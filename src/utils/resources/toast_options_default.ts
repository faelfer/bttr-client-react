interface ToastDefaultProps {
  head: string;
  body?: string;
  type: "info" | "warning" | "success" | "error" | "loading";
}

export const toastErrorDefault: ToastDefaultProps = {
  head: "Aviso",
  body: "No momento esse recurso está indisponível, tente novamente mais tarde.",
  type: "error",
};

export const toastWarningDefault: ToastDefaultProps = {
  head: "Aviso",
  type: "warning",
};

export const toastSuccessDefault: ToastDefaultProps = {
  head: "Sucesso",
  type: "success",
};
