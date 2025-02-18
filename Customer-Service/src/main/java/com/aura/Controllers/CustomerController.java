package com.aura.Controllers;


import com.aura.DTO.CustomerRequest;
import com.aura.DTO.CustomerResponse;
import com.aura.Services.Interfaces.CustomerInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerInterface customerService;

    @PostMapping
    public CustomerResponse saveCustomer(@RequestBody CustomerRequest customerRequest) {
        return customerService.saveCustomer(customerRequest);
    }

    @GetMapping("/{id}")
    public CustomerResponse getCustomer(@PathVariable Long id) {
        return customerService.getCustomer(id);
    }

    @GetMapping
    public List<CustomerResponse> getAllCustomers() {
        return customerService.getAllCustomers();
    }
}