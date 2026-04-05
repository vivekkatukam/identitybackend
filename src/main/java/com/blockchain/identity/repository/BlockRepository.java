package com.blockchain.identity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blockchain.identity.model.Block;
import java.util.Optional;

public interface BlockRepository extends JpaRepository<Block, Long> {
    Optional<Block> findTopByOrderByIdDesc();
}