package com.aura.Services.Implementations;

import com.aura.DTO.CustomerRequest;
import com.aura.DTO.CustomerResponse;
import com.aura.Entities.Customer;
import com.aura.Mapper.CustomerMapper;
import com.aura.Repositories.CustomerRepository;
import com.aura.Services.Interfaces.CustomerInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerImpl implements CustomerInterface {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    public CustomerResponse saveCustomer(CustomerRequest req) {
        Customer customer = customerMapper.toEntity(req);
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.toResponse(savedCustomer);
    }

    @Override
    public CustomerResponse getCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return customerMapper.toResponse(customer);
    }

    @Override
    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(customerMapper::toResponse)
                .collect(Collectors.toList());
    }
}

