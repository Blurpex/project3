package edu.psu.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import edu.psu.backend.model.Request;

public interface RequestRepository extends MongoRepository<Request, String> {}
