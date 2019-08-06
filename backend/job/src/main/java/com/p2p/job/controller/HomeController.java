package com.p2p.job.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// 한개는 존재 해야함

@Controller
public class HomeController {
    @RequestMapping("/")
    public String Home(){
        return "index";
    }
}