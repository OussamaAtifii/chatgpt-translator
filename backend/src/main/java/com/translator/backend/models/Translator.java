package com.translator.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Translator {
    private String targetLanguage;
    private String sourceLanguage;
    private String inputMessage;
}
