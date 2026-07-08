export interface BillingI {
    "enrollmentId": string;
    "course": {
        "_id": string;
        "title": string;
        "thumbnail": string;
    },
    "paymentPlan": string;
    "status": string;
    "currency": string;
    "totalAmount": number;
    "totalPaid": number;
    "totalDue": number;
    "nextDueDate": string;
}

export interface TransactionI {
    reference: string;
    user: string;
    virtual_account: any;
    invoice: string;
    amount: number;
    amount_used: number;
    amount_settled: number;
    bank_charge: number;
    customer_name: string;
    account_number: string;
    bank_name: string;
    source_account_name: string;
    source_account_number: string;
    source_bank_name: string;
    source_bank_code: string;
    proivder: string;
    channel: string;
    currency: string;
    date: string;
}