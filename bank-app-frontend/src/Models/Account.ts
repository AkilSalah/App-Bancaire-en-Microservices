export  interface Account {
    id: number;
    balance: number;
    customerId: number;
    type: 'COURANT' | 'EPARGNE';
}