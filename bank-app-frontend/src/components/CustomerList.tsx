import React, { useEffect, useState } from "react";
import { customerService } from "../Services/Api";
import { Customer } from '../Models/Customer';
import CustomerModal from './CustomerModal';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (err) {
      setError("Erreur lors du chargement des clients.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (customerData: Omit<Customer, 'id'>) => {
    try {
      await customerService.createCustomer(customerData);
      fetchCustomers();
      setIsModalOpen(false);
    } catch (err) {
      setError("Erreur lors de l'ajout du client.");
    }
  };

  const handleUpdateCustomer = async (customerData: Omit<Customer, 'id'>) => {
    if (!selectedCustomer) return;
    try {
      await customerService.updateCustomer(selectedCustomer.id, customerData);
      fetchCustomers();
      setIsModalOpen(false);
      setSelectedCustomer(null);
    } catch (err) {
      setError("Erreur lors de la mise à jour du client.");
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        await customerService.deleteCustomer(id);
        fetchCustomers();
      } catch (err) {
        setError("Erreur lors de la suppression du client.");
      }
    }
  };

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h5 className="text-4xl font-bold m-10 leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h5>
        <button
          type="button"
          onClick={() => {
            setSelectedCustomer(null);
            setIsModalOpen(true);
          }}
          className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 
                    focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm 
                    px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900"
        >
          Add Customer
        </button>
      </div>

      <div className="font-sans m-5 overflow-x-auto">
        <table className="min-w-full rounded-5 divide-y divide-gray-200">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {customer.id}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {customer.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {customer.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  <button 
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={selectedCustomer ? handleUpdateCustomer : handleAddCustomer}
        customer={selectedCustomer || undefined}
      />
    </div>
  );
};

export default CustomerList;