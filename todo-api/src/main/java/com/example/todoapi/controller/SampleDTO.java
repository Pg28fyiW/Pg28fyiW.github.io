package com.example.todoapi.controller;

import lombok.Value;

import java.time.LocalDateTime;

@Value
public class SampleDTO {

    private  String content;

    private LocalDateTime timestamp;



}
