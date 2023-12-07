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
@Document(collection = "requests")
public class Request {

    @Id
    private String id;
    private String tenantId;
    private int apartmentNum;
    private String location;
    private String description;
    private String status;
    private Date requestTime;
    private String image;

}
