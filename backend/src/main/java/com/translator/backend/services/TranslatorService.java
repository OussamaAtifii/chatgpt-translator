package com.translator.backend.services;

import com.translator.backend.models.Translator;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public interface TranslatorService {

    HashMap<String, Object> translate(Translator translatorDto);
}
