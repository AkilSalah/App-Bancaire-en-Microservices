package com.aura.Controllers;

import com.aura.DTOs.AccountRequest;
import com.aura.DTOs.AccountResponse;
import com.aura.Services.Interfaces.AccountService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@Slf4j
@AllArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(@Valid @RequestBody AccountRequest accountRequest) {
        log.info("Received request to create account: {}", accountRequest);
        try {
            AccountResponse response = accountService.createAccount(accountRequest);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            log.error("Invalid request: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            log.error("Error creating account: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/{id}")
    public AccountResponse getAccount(@PathVariable Long id) {
        return accountService.getAccount(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<AccountResponse> getAccountsByCustomerId(@PathVariable Long customerId) {
        return accountService.getAccountsByCustomerId(customerId);
    }
    @PutMapping("/{id}")
    public ResponseEntity<AccountResponse> updateAccount(@PathVariable Long id, @Valid @RequestBody AccountRequest accountRequest) {
        log.info("Received request to update account: {}", accountRequest);
        AccountResponse response = accountService.updateAccount(accountRequest,id);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        log.info("Received request to delete account: {}", id);
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public ResponseEntity<List<AccountResponse>> getAccounts() {
        List<AccountResponse> allAccounts = accountService.getAllAccounts();
        return ResponseEntity.ok(allAccounts);
    }

}