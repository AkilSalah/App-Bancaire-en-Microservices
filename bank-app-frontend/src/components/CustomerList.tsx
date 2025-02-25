import React, { useEffect, useState } from "react";
import { customerService } from "../Services/Api";
import { Customer } from '../Models/Customer';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchCustomers();
  }, []);

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Liste des Clients</h2>
      <div className="font-sans overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
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
                  <button className="text-blue-600 mr-4">Edit</button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;