package com.translator.backend.controllers;

import com.translator.backend.models.Translator;
import com.translator.backend.services.TranslatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/translator")
public class TranslatorController {
    private final TranslatorService translatorService;

    public TranslatorController(TranslatorService translatorService) {
        this.translatorService = translatorService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping()
    public ResponseEntity<HashMap<String, Object>> translate(@RequestBody Translator translator) {

        if (translator.getInputMessage().trim().isEmpty()) {
            HashMap<String, Object> response = new HashMap<>();

            response.put("error", true);
            response.put("response", "Please enter a message to translate");

            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(translatorService.translate(translator));
    }
}
