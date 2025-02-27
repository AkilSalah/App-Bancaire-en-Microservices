import React, { useEffect, useState } from "react";
import { Account } from "../Models/Account";

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (account: Omit<Account, 'id'>) => void;
    account?: Account;
    customers: { id: number; name: string }[]; // Pour la liste des clients
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onSubmit, account, customers }) => {
    const [formData, setFormData] = useState({
        balance: 0,
        type: 'COURANT',
        customerId: null as number | null,
    });

    useEffect(() => {
        if (account) {
            setFormData({
                balance: account.balance,
                type: account.type,
                customerId: account.customerId,
            });
        } else {
            setFormData({
                balance: 0,
                type: 'COURANT',
                customerId: null,
            });
        }
    }, [account]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.customerId === null) {
            alert("Veuillez sélectionner un client");
            return;
        }
        onSubmit(formData as Omit<Account, 'id'>);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {account ? 'Modifier le compte' : 'Créer un compte'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Type de compte
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'COURANT' | 'EPARGNE' })}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="COURANT">Compte Courant</option>
                            <option value="EPARGNE">Compte Épargne</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Solde initial
                        </label>
                        <input
                            type="number"
                            value={formData.balance}
                            onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) })}
                            className="w-full p-2 border rounded"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Client
                        </label>
                        <select
                            value={formData.customerId || ''}
                            onChange={(e) => setFormData({ ...formData, customerId: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Sélectionnez un client</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm text-white bg-orange-400 hover:bg-orange-500 rounded"
                        >
                            {account ? 'Modifier' : 'Créer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountModal;