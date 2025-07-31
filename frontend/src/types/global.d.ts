interface ISonnerToast {
  isOpen: boolean;
  message: string;
  title: string;
  type?: "success" | "alert" | "danger" | "warn" | "default";
}

interface ICustomer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  tag: string;
  note?: string;
  date?: string;
}

export { ISonnerToast, ICustomer };
