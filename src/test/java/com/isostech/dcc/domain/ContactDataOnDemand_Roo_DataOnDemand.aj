// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.isostech.dcc.domain;

import com.isostech.dcc.domain.Contact;
import com.isostech.dcc.domain.ContactDataOnDemand;
import com.isostech.dcc.domain.PersonDataOnDemand;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect ContactDataOnDemand_Roo_DataOnDemand {
    
    declare @type: ContactDataOnDemand: @Component;
    
    private Random ContactDataOnDemand.rnd = new SecureRandom();
    
    private List<Contact> ContactDataOnDemand.data;
    
    @Autowired
    PersonDataOnDemand ContactDataOnDemand.personDataOnDemand;
    
    public Contact ContactDataOnDemand.getNewTransientContact(int index) {
        Contact obj = new Contact();
        setContactValue(obj, index);
        setType(obj, index);
        return obj;
    }
    
    public void ContactDataOnDemand.setContactValue(Contact obj, int index) {
        String contactValue = "contactValue_" + index;
        if (contactValue.length() > 256) {
            contactValue = contactValue.substring(0, 256);
        }
        obj.setContactValue(contactValue);
    }
    
    public void ContactDataOnDemand.setType(Contact obj, int index) {
        String type = "type_" + index;
        if (type.length() > 10) {
            type = type.substring(0, 10);
        }
        obj.setType(type);
    }
    
    public Contact ContactDataOnDemand.getSpecificContact(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Contact obj = data.get(index);
        Long id = obj.getId();
        return Contact.findContact(id);
    }
    
    public Contact ContactDataOnDemand.getRandomContact() {
        init();
        Contact obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return Contact.findContact(id);
    }
    
    public boolean ContactDataOnDemand.modifyContact(Contact obj) {
        return false;
    }
    
    public void ContactDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = Contact.findContactEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Contact' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Contact>();
        for (int i = 0; i < 10; i++) {
            Contact obj = getNewTransientContact(i);
            try {
                obj.persist();
            } catch (ConstraintViolationException e) {
                StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getConstraintDescriptor()).append(":").append(cv.getMessage()).append("=").append(cv.getInvalidValue()).append("]");
                }
                throw new RuntimeException(msg.toString(), e);
            }
            obj.flush();
            data.add(obj);
        }
    }
    
}
