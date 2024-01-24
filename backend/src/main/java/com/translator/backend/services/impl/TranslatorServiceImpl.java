package com.translator.backend.services.impl;

import com.translator.backend.models.Translator;
import com.translator.backend.services.TranslatorService;
import io.github.flashvayne.chatgpt.dto.chat.MultiChatMessage;
import io.github.flashvayne.chatgpt.service.ChatgptService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class TranslatorServiceImpl implements TranslatorService {

    private final ChatgptService chatgptService;

    public TranslatorServiceImpl(ChatgptService chatgptService) {
        this.chatgptService = chatgptService;
    }

    @Override
    public HashMap<String, Object> translate(Translator translator) {
        HashMap<String, Object> response = new HashMap<>();

        String result = chatgptService.multiChat(List.of(
                new MultiChatMessage("user", "Realiza una traducción desde " +
                        translator.getSourceLanguage() + " hacia " + translator.getTargetLanguage() +
                        " sin revelar el idioma traducido ni mostrar nada más que la traducción. " +
                        "Este es el texto a traducir: " + translator.getInputMessage())));

        response.put("response", result);
        return response;
    }
}
