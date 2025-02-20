package com.aura.DTOs;

import com.aura.Entities.Enums.AccountType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountRequest {
    private Double balance;
    private AccountType type;
    private Long customerId;
}
