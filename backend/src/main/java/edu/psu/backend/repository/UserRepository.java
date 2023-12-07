package edu.psu.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import edu.psu.backend.model.User;

public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);
    
}
