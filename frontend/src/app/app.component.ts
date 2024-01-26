import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Language, Translator } from './models/translator.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { LANGUAGES } from './constants/languages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  response?: string = '';
  sourceLanguage: string = window.navigator.language.substring(0, 2);
  targetLanguage: string = '';
  languages: Language[] = LANGUAGES;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      userInput: '',
      sourceLanguageInput: this.sourceLanguage,
      targetLanguageInput: ''
    });
  }

  ngOnInit(): void {
    this.form.get('userInput')?.valueChanges.pipe(
      debounceTime(150),
      switchMap(input => {
        this.loading = true;
        return this.api.translate(this.createTranslatorObject(input))
      }),
    ).subscribe((response) => {
      this.loading = true;
      this.response = response.response;
      this.loading = false;
    })

    this.form.get('sourceLanguageInput')?.valueChanges.subscribe((sourceLanguage) => {
      this.sourceLanguage = sourceLanguage;
    })

    this.form.get('targetLanguageInput')?.valueChanges.subscribe((targetLanguage) => {
      this.targetLanguage = targetLanguage;
    })
  }

  getSourceLanguage(language: string) {
    this.sourceLanguage = language;
  }

  copyClipboard() {
    navigator.clipboard.writeText(this.response || '');
  }

  changeLanguages() {
    let sourceLanguage = this.sourceLanguage;
    let targetLanguage = this.targetLanguage;

    this.form.get('sourceLanguageInput')?.setValue(targetLanguage);
    this.form.get('targetLanguageInput')?.setValue(sourceLanguage);
  }

  private createTranslatorObject(input: string): Translator {
    return {
      targetLanguage: this.targetLanguage,
      sourceLanguage: this.sourceLanguage,
      inputMessage: input
    };
  }
}
