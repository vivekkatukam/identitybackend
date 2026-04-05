package com.blockchain.identity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blockchain.identity.model.*;
import com.blockchain.identity.repository.*;
import com.blockchain.identity.util.HashUtil;

import java.util.List;

@Service
public class BlockchainService {

    @Autowired
    private IdentityRepository identityRepo;

    @Autowired
    private BlockRepository blockRepo;

    public Identity register(Identity identity) {

        String raw = identity.getName() + identity.getEmail() + identity.getDocumentNumber();

        String hash = HashUtil.generateHash(raw);
        identity.setIdentityHash(hash);

        identityRepo.save(identity);

        addBlock(hash);

        return identity;
    }

    private void addBlock(String data) {

        String prevHash = "0";

        if (blockRepo.count() > 0) {
            prevHash = blockRepo.findTopByOrderByIdDesc().get().getHash();
        }

        long time = System.currentTimeMillis();

        String newHash = HashUtil.generateHash(data + prevHash + time);

        blockRepo.save(new Block(data, prevHash, newHash, time));
    }

    public List<Block> getChain() {
        return blockRepo.findAll();
    }

    public String verify(Long id) {

        Identity identity = identityRepo.findById(id).orElse(null);

        if (identity == null) return "Identity Not Found";

        boolean exists = blockRepo.findAll().stream().anyMatch(b -> b.getData().equals(identity.getIdentityHash()));

        return exists ? "Identity Verified ✅" : "Verification Failed ❌";
    }
}