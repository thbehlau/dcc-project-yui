// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.isostech.dcc.domain;

import com.isostech.dcc.domain.Contact;
import com.isostech.dcc.domain.Person;

privileged aspect Contact_Roo_JavaBean {
    
    public String Contact.getType() {
        return this.type;
    }
    
    public void Contact.setType(String type) {
        this.type = type;
    }
    
    public String Contact.getContactValue() {
        return this.contactValue;
    }
    
    public void Contact.setContactValue(String contactValue) {
        this.contactValue = contactValue;
    }
    
    public Person Contact.getPerson() {
        return this.person;
    }
    
    public void Contact.setPerson(Person person) {
        this.person = person;
    }
    
}
