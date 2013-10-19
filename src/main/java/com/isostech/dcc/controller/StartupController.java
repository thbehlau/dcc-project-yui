package com.isostech.dcc.controller;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import com.isostech.dcc.domain.Contact;
import com.isostech.dcc.domain.Person;

@Controller
public class StartupController {
	
	@PostConstruct
	@Transactional
	public void startUp() {
		Person p1 = new Person();
		p1.setFirstName("Thomas");
		p1.setLastName("Behlau");

		Contact c1 = new Contact();
		c1.setType("email");
		c1.setContactValue("thomas.behlau@isostech.com");
		c1.setPerson(p1);
		
		Contact c11 = new Contact();
		c11.setType("phone");
		c11.setContactValue("480-555-1212");
		c11.setPerson(p1);
		
		p1.getContacts().add(c1);
		p1.getContacts().add(c11);
		p1.persist();

		Person p2 = new Person();
		p2.setFirstName("John");
		p2.setLastName("Doe");
		Contact c2 = new Contact();
		c2.setType("email");
		c2.setContactValue("john.doe@gmail.com");
		c2.setPerson(p2);

		p2.getContacts().add(c2);
		p2.persist();
	}
}
