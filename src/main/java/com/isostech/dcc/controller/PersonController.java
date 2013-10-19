package com.isostech.dcc.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isostech.dcc.domain.Contact;
import com.isostech.dcc.domain.Person;

@RooWebJson(jsonObject = Person.class)
@Controller
@RequestMapping("/people")
public class PersonController {
    
	@Transactional
	@RequestMapping(value="/{id}/contacts", headers = "Accept=application/json")
	@ResponseBody
	public ResponseEntity<String> getContacts(@PathVariable("id") Long id){
        Person person = Person.findPerson(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (person == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(Contact.toJsonArray(person.getContacts()), headers, HttpStatus.OK);
		
	}
}
