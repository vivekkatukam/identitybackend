package com.blockchain.identity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.blockchain.identity.model.*;
import com.blockchain.identity.service.BlockchainService;

import java.util.List;

@RestController
@RequestMapping("/api/blockchain")
@CrossOrigin("*")
public class IdentityController {

    @Autowired
    private BlockchainService service;

    @PostMapping("/register")
    public Identity register(@RequestBody Identity identity) {
        return service.register(identity);
    }

    @GetMapping("/chain")
    public List<Block> getChain() {
        return service.getChain();
    }

    @GetMapping("/verify/{id}")
    public String verify(@PathVariable Long id) {
        return service.verify(id);
    }
}