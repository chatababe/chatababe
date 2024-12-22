declare type CheckoutTransactionParams = {
    plan: string;
    credits: number;
    amount: number;
  };
  
  declare type CreateTransactionParams = {
    stripeId: string;
    amount: number;
    credits: number;
    plan: string;
    createdAt: Date;
  };