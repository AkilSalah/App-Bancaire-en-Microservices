package com.aura.Mapper;

import com.aura.DTOs.AccountRequest;
import com.aura.DTOs.AccountResponse;
import com.aura.Entities.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    Account toEntity(AccountRequest request);
    AccountResponse toResponse(Account account);
    @Mapping(target = "id" ,ignore =true)
    void updateAccountFromRequest(AccountRequest request , @MappingTarget Account account);
}
