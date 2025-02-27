package com.aura.Services.Implementations;

import com.aura.DTOs.AccountRequest;
import com.aura.DTOs.AccountResponse;
import com.aura.Entities.Account;
import com.aura.Mapper.AccountMapper;
import com.aura.Repositories.AccountRepository;
import com.aura.Services.Interfaces.AccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@AllArgsConstructor
public class AccountImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;

    private final RestTemplate template;


    @Override
    public AccountResponse createAccount(AccountRequest accountRequest) {
        if (accountRequest.getCustomerId() == null) {
            throw new IllegalArgumentException("Customer ID is required");
        }
        String customerUrl = "http://CUSTOMER-SERVICE/api/customers/" + accountRequest.getCustomerId();
        try {
            ResponseEntity<Void> response = template.getForEntity(customerUrl, Void.class);

            if (response.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException("Customer not found with ID: " + accountRequest.getCustomerId());
            }
            Account account = accountMapper.toEntity(accountRequest);
            Account savedAccount = accountRepository.save(account);

            log.info("Created account {} for customer {}",
                    savedAccount.getId(),
                    accountRequest.getCustomerId());

            return accountMapper.toResponse(savedAccount);

        } catch (HttpClientErrorException.NotFound e) {
            throw new RuntimeException("Customer not found with ID: " + accountRequest.getCustomerId());
        } catch (Exception e) {
            log.error("Error creating account", e);
            throw new RuntimeException("Failed to create account: " + e.getMessage());
        }
    }

    @Override
    public AccountResponse getAccount(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        return accountMapper.toResponse(account);    }

    @Override
    public List<AccountResponse> getAccountsByCustomerId(Long customerId) {
        return accountRepository.findByCustomerId(customerId)
                .stream()
                .map(accountMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AccountResponse updateAccount(AccountRequest accountRequest, Long id) {
        Account account = accountRepository.findById(id).orElseThrow(
                () ->  new  RuntimeException("Account not found")
        );
        String customerUrl = "http://CUSTOMER-SERVICE/api/customers/" + accountRequest.getCustomerId();
        ResponseEntity<Void> response = template.getForEntity(customerUrl, Void.class);
        if (response.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException("Customer not found with ID: " + accountRequest.getCustomerId());
        }
        accountMapper.updateAccountFromRequest(accountRequest , account);
        Account updatedAccount = accountRepository.save(account);
        return accountMapper.toResponse(updatedAccount);
    }

    @Override
    public void deleteAccount(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(
                () -> new  RuntimeException("Account not found")
        );
        accountRepository.delete(account);
    }

    @Override
    public List<AccountResponse> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream().map(accountMapper::toResponse).collect(Collectors.toList());
    }
}



