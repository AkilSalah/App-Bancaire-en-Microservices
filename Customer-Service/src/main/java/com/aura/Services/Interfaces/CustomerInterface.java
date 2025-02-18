package com.aura.Services.Interfaces;

import com.aura.DTO.CustomerRequest;
import com.aura.DTO.CustomerResponse;

import java.util.List;

public interface CustomerInterface {
    CustomerResponse saveCustomer(CustomerRequest customerRequest);
    CustomerResponse getCustomer(Long id);
    List<CustomerResponse> getAllCustomers();
}
