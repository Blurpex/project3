package edu.psu.backend.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String name;
    private String phoneNumber;
    private String email;
    private String password;
    private String address;
    private String group;
    private Date checkIn;
    private Date checkOut;

}
