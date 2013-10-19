package com.isostech.dcc.controller;

import com.isostech.dcc.domain.Contact;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = Contact.class)
@Controller
@RequestMapping("/contacts")
public class ContactController {
}
