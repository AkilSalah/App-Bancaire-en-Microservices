package com.aura.Mapper;

import com.aura.DTO.CustomerRequest;
import com.aura.DTO.CustomerResponse;
import com.aura.Entities.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    @Mapping(target = "id" ,ignore =true)
    Customer toEntity(CustomerRequest request);

    CustomerResponse toResponse(Customer customer);

    @Mapping(target = "id" ,ignore =true)
    void updateCustomerFromRequest(CustomerRequest request, @MappingTarget Customer customer);
}
