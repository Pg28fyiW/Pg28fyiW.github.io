package com.example.todoapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/samples")
public class SampleController {
    @GetMapping
    public  SampleDTO  index() {
        return new SampleDTO("OK", LocalDateTime.now() );
    }
}
