package com.aura.DTOs;

import com.aura.Entities.Enums.AccountType;
import lombok.Data;

@Data
public class AccountResponse {
    private Long id;
    private Double balance;
    private AccountType type;
    private Long customerId;
}
