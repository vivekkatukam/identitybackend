package com.blockchain.identity.model;

import jakarta.persistence.*;

@Entity
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String data;
    private String previousHash;
    private String hash;
    private long timestamp;

    public Block() {
    }

    public Block(String data, String previousHash, String hash, long timestamp) {
        this.data = data;
        this.previousHash = previousHash;
        this.hash = hash;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public String getData() {
        return data;
    }

    public String getPreviousHash() {
        return previousHash;
    }

    public String getHash() {
        return hash;
    }

    public long getTimestamp() {
        return timestamp;
    }
}
