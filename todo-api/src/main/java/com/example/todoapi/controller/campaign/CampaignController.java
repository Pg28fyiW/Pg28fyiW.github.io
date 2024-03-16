package com.example.todoapi.controller.campaign;

import com.example.todoapi.controller.CampaignDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/campaign")
public class CampaignController {

    // GET /campaign
    @GetMapping
    @CrossOrigin(origins = {"http://localhost:4200"})
    public CampaignDTO index() {
        return new CampaignDTO(
                "1234567890",
                "C001",
                "00",
                "01");
    }
}
