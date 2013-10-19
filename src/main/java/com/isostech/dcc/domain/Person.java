package com.isostech.dcc.domain;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import javax.validation.constraints.Size;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class Person {

    @Size(max = 20)
    private String firstName;

    @Size(max = 20)
    private String lastName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "person")
    private Set<Contact> contacts = new HashSet<Contact>();
}
