package com.aura.Account_Service;
import com.aura.DTOs.AccountRequest;
import com.aura.DTOs.AccountResponse;
import com.aura.Entities.Account;
import com.aura.Mapper.AccountMapper;
import com.aura.Repositories.AccountRepository;
import com.aura.Services.Implementations.AccountIml;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountImlTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private AccountMapper accountMapper;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private AccountIml accountService;

    private AccountRequest accountRequest;
    private Account account;
    private AccountResponse accountResponse;
    private final Long CUSTOMER_ID = 1L;
    private final Long ACCOUNT_ID = 1L;

    @BeforeEach
    void setUp() {
        accountRequest = new AccountRequest();
        accountRequest.setCustomerId(CUSTOMER_ID);

        account = new Account();
        account.setId(ACCOUNT_ID);
        account.setCustomerId(CUSTOMER_ID);

        accountResponse = new AccountResponse();
        accountResponse.setId(ACCOUNT_ID);
        accountResponse.setCustomerId(CUSTOMER_ID);
    }

    @Test
    void createAccount_WithValidCustomer_ShouldReturnAccountResponse() {
        ResponseEntity<Void> responseEntity = new ResponseEntity<>(HttpStatus.OK);
        when(restTemplate.getForEntity(anyString(), eq(Void.class))).thenReturn(responseEntity);
        when(accountMapper.toEntity(accountRequest)).thenReturn(account);
        when(accountRepository.save(any(Account.class))).thenReturn(account);
        when(accountMapper.toResponse(account)).thenReturn(accountResponse);

        AccountResponse result = accountService.createAccount(accountRequest);

        assertNotNull(result);
        assertEquals(ACCOUNT_ID, result.getId());
        verify(restTemplate).getForEntity(anyString(), eq(Void.class));
        verify(accountMapper).toEntity(accountRequest);
        verify(accountRepository).save(account);
        verify(accountMapper).toResponse(account);
    }

    @Test
    void createAccount_WithNullCustomerId_ShouldThrowIllegalArgumentException() {
        accountRequest.setCustomerId(null);

        assertThrows(IllegalArgumentException.class,
                () -> accountService.createAccount(accountRequest));

        verify(restTemplate, never()).getForEntity(anyString(), any());
        verify(accountRepository, never()).save(any());
    }

    @Test
    void createAccount_WithNonExistentCustomer_ShouldThrowRuntimeException() {
        when(restTemplate.getForEntity(anyString(), eq(Void.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));

        assertThrows(RuntimeException.class,
                () -> accountService.createAccount(accountRequest));

        verify(accountRepository, never()).save(any());
    }

    @Test
    void createAccount_WithRestTemplateError_ShouldThrowRuntimeException() {
        when(restTemplate.getForEntity(anyString(), eq(Void.class)))
                .thenThrow(new RuntimeException("Connection error"));

        assertThrows(RuntimeException.class,
                () -> accountService.createAccount(accountRequest));

        verify(accountRepository, never()).save(any());
    }

    @Test
    void getAccount_WithValidId_ShouldReturnAccountResponse() {
        when(accountRepository.findById(ACCOUNT_ID)).thenReturn(Optional.of(account));
        when(accountMapper.toResponse(account)).thenReturn(accountResponse);

        AccountResponse result = accountService.getAccount(ACCOUNT_ID);

        assertNotNull(result);
        assertEquals(ACCOUNT_ID, result.getId());
        verify(accountRepository).findById(ACCOUNT_ID);
        verify(accountMapper).toResponse(account);
    }

    @Test
    void getAccount_WithInvalidId_ShouldThrowRuntimeException() {
        when(accountRepository.findById(ACCOUNT_ID)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> accountService.getAccount(ACCOUNT_ID));

        verify(accountMapper, never()).toResponse(any());
    }

    @Test
    void getAccountsByCustomerId_ShouldReturnListOfAccounts() {
        List<Account> accounts = Arrays.asList(account);
        when(accountRepository.findByCustomerId(CUSTOMER_ID)).thenReturn(accounts);
        when(accountMapper.toResponse(account)).thenReturn(accountResponse);

        List<AccountResponse> results = accountService.getAccountsByCustomerId(CUSTOMER_ID);

        assertNotNull(results);
        assertFalse(results.isEmpty());
        assertEquals(1, results.size());
        assertEquals(CUSTOMER_ID, results.get(0).getCustomerId());
        verify(accountRepository).findByCustomerId(CUSTOMER_ID);
        verify(accountMapper).toResponse(account);
    }
}