package com.blockchain.identity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blockchain.identity.model.Identity;

public interface IdentityRepository extends JpaRepository<Identity, Long> {
}