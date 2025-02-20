package com.aura.Customer_Service;
import com.aura.DTO.CustomerRequest;
import com.aura.DTO.CustomerResponse;
import com.aura.Entities.Customer;
import com.aura.Mapper.CustomerMapper;
import com.aura.Repositories.CustomerRepository;
import com.aura.Services.Implementations.CustomerImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerImplTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerMapper customerMapper;

    @InjectMocks
    private CustomerImpl customerService;

    private CustomerRequest customerRequest;
    private Customer customer;
    private CustomerResponse customerResponse;

    @BeforeEach
    void setUp() {
        customerRequest = new CustomerRequest();
        customer = new Customer();
        customerResponse = new CustomerResponse();
    }

    @Test
    void saveCustomer_ShouldReturnCustomerResponse() {
        when(customerMapper.toEntity(customerRequest)).thenReturn(customer);
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);
        when(customerMapper.toResponse(customer)).thenReturn(customerResponse);

        CustomerResponse result = customerService.saveCustomer(customerRequest);

        assertNotNull(result);
        verify(customerMapper).toEntity(customerRequest);
        verify(customerRepository).save(customer);
        verify(customerMapper).toResponse(customer);
    }

    @Test
    void getCustomer_WithValidId_ShouldReturnCustomerResponse() {
        Long id = 1L;
        when(customerRepository.findById(id)).thenReturn(Optional.of(customer));
        when(customerMapper.toResponse(customer)).thenReturn(customerResponse);

        CustomerResponse result = customerService.getCustomer(id);

        assertNotNull(result);
        verify(customerRepository).findById(id);
        verify(customerMapper).toResponse(customer);
    }

    @Test
    void getCustomer_WithInvalidId_ShouldThrowException() {
        Long id = 1L;
        when(customerRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> customerService.getCustomer(id));
        verify(customerRepository).findById(id);
        verify(customerMapper, never()).toResponse(any());
    }

    @Test
    void getAllCustomers_ShouldReturnListOfCustomerResponses() {
        List<Customer> customers = Arrays.asList(customer);
        when(customerRepository.findAll()).thenReturn(customers);
        when(customerMapper.toResponse(customer)).thenReturn(customerResponse);

        List<CustomerResponse> results = customerService.getAllCustomers();

        assertNotNull(results);
        assertFalse(results.isEmpty());
        assertEquals(1, results.size());
        verify(customerRepository).findAll();
        verify(customerMapper).toResponse(customer);
    }
}