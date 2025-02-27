import React, { useEffect, useState } from "react";
import { Account } from "../Models/Account";
import { Customer } from "../Models/Customer";
import AccountModal from "./AccountModal";
import { accountService, customerService } from "../Services/Api";

const AccountList: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    useEffect(() => {
        fetchAccounts();
        fetchCustomers();
    }, []);

    const fetchAccounts = async () => {
        try {
            const data = await accountService.getAllAccounts();
            setAccounts(data);
        } catch (err) {
            setError("Erreur lors du chargement des comptes.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const data = await customerService.getAllCustomers();
            setCustomers(data);
        } catch (err) {
            setError("Erreur lors du chargement des clients.");
        }
    };

    const handleAddAccount = async (accountData: Omit<Account, 'id'>) => {
        try {
            await accountService.createAccount(accountData);
            fetchAccounts();
            setIsModalOpen(false);
        } catch (err) {
            setError("Erreur lors de l'ajout du compte.");
        }
    };

    const handleUpdateAccount = async (accountData: Omit<Account, 'id'>) => {
        if (!selectedAccount) return;
        try {
            await accountService.updateAccount(selectedAccount.id, accountData);
            fetchAccounts();
            setIsModalOpen(false);
            setSelectedAccount(null);
        } catch (err) {
            setError("Erreur lors de la mise à jour du compte.");
        }
    };

    const handleDeleteAccount = async (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
            try {
                await accountService.deleteAccount(id);
                fetchAccounts();
            } catch (err) {
                setError("Erreur lors de la suppression du compte.");
            }
        }
    };

    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="flex justify-between items-center">
                <h5 className="text-4xl font-bold m-10 leading-none text-gray-900 dark:text-white">
                    Comptes bancaires
                </h5>
                <button
                    type="button"
                    onClick={() => {
                        setSelectedAccount(null);
                        setIsModalOpen(true);
                    }}
                    className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 
                              focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm 
                              px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900"
                >
                    Ajouter un compte
                </button>
            </div>

            <div className="font-sans m-5 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 whitespace-nowrap">
                        <tr>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Solde
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Client
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                        {accounts.map((account) => (
                            <tr key={account.id}>
                                <td className="px-4 py-4 text-sm text-gray-800">
                                    {account.id}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-800">
                                    {account.type}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-800">
                                    {account.balance.toFixed(2)} €
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-800">
                                    {customers.find(c => c.id === account.customerId)?.name || 'Client inconnu'}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-800">
                                    <button
                                        onClick={() => {
                                            setSelectedAccount(account);
                                            setIsModalOpen(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800 mr-4"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAccount(account.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AccountModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedAccount(null);
                }}
                onSubmit={selectedAccount ? handleUpdateAccount : handleAddAccount}
                account={selectedAccount || undefined}
                customers={customers}
            />
        </div>
    );
};

export default AccountList;