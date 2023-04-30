export interface InvoiceTypes {
  _id: any;
  id: string;
  createdAt: Date;
  paymentDue: Date;
  description: string;
  paymentTerms: any;
  clientEmail: string;
  clientName: string;
  status: string;
  total: number;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: ICosting[];
}

export interface ICosting {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
