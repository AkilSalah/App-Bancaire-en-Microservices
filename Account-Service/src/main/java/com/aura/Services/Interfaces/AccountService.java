package com.aura.Services.Interfaces;

import com.aura.DTOs.AccountRequest;
import com.aura.DTOs.AccountResponse;

import java.util.List;

public interface AccountService {
    AccountResponse createAccount(AccountRequest accountRequest);
    AccountResponse getAccount(Long id);
    List<AccountResponse> getAccountsByCustomerId(Long customerId);
    AccountResponse updateAccount(AccountRequest accountRequest, Long id);
    void deleteAccount(Long id);
    List<AccountResponse> getAllAccounts();
}
