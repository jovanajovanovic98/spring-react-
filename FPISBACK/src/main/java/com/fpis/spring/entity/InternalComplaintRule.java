package com.fpis.spring.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Data
@Entity
public class InternalComplaintRule implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInternalComplaintRule;

    @NonNull
    private String name;

    @NonNull
    private Date dateEntry;

    @NonNull
    private String description;

    @NonNull
    @ManyToOne
    private SubjectRule subjectRule;
}
