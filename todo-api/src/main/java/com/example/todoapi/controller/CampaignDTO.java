package com.example.todoapi.controller;

public class CampaignDTO {
    private String campaignId;
    private String campaignType;

    private  String accect;

    private  String apply;

    public CampaignDTO(String campaignId, String campaignType, String accect, String apply) {
        this.campaignId = campaignId;
        this.campaignType = campaignType;
        this.accect = accect;
        this.apply = apply;
    }

    public String getCampaignId() {
        return campaignId;
    }

    public String getCampaignType() {
        return campaignType;
    }

    public String getAccect() {
        return accect;
    }

    public String getApply() {
        return apply;
    }
}
