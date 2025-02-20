package com.aura.Mapper;

import com.aura.DTOs.AccountRequest;
import com.aura.DTOs.AccountResponse;
import com.aura.Entities.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    Account toEntity(AccountRequest request);
    AccountResponse toResponse(Account account);
}
