// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.isostech.dcc.domain;

import com.isostech.dcc.domain.Contact;
import com.isostech.dcc.domain.Person;
import java.util.Set;

privileged aspect Person_Roo_JavaBean {
    
    public String Person.getFirstName() {
        return this.firstName;
    }
    
    public void Person.setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String Person.getLastName() {
        return this.lastName;
    }
    
    public void Person.setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public Set<Contact> Person.getContacts() {
        return this.contacts;
    }
    
    public void Person.setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }
    
}
