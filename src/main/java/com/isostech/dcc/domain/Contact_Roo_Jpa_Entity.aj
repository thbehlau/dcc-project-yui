// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.isostech.dcc.domain;

import com.isostech.dcc.domain.Contact;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;

privileged aspect Contact_Roo_Jpa_Entity {
    
    declare @type: Contact: @Entity;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long Contact.id;
    
    @Version
    @Column(name = "version")
    private Integer Contact.version;
    
    public Long Contact.getId() {
        return this.id;
    }
    
    public void Contact.setId(Long id) {
        this.id = id;
    }
    
    public Integer Contact.getVersion() {
        return this.version;
    }
    
    public void Contact.setVersion(Integer version) {
        this.version = version;
    }
    
}
