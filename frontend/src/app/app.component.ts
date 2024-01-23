import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Translator } from './models/translator.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  form!: FormGroup;
  loading: boolean = false;
  response?: string = '';
  sourceLanguage: string = '';
  targetLanguage: string = '';

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      userInput: '',
      sourceLanguageInput: '',
      targetLanguageInput: ''
    });

    this.form.get('userInput')?.valueChanges.pipe(
      debounceTime(150),
      switchMap(input => {
        this.loading = true;
        return this.api.translate(this.createTranslatorObject(input))
      }),
    ).subscribe((response) => {
      this.loading = true;
      console.log("Fectch realizado");
      this.response = response.response

      this.loading = false;
    })

    this.form.get('sourceLanguageInput')?.valueChanges.subscribe((sourceLanguage) => {
      this.sourceLanguage = sourceLanguage;
    })

    this.form.get('targetLanguageInput')?.valueChanges.subscribe((targetLanguage) => {
      this.targetLanguage = targetLanguage;
    })
  }

  copyClipboard() {
    navigator.clipboard.writeText(this.response || '');
  }

  private createTranslatorObject(input: string): Translator {
    console.log({
      targetLanguage: this.targetLanguage,
      sourceLanguage: this.sourceLanguage,
      inputMessage: input
    });

    return {
      targetLanguage: this.targetLanguage,
      sourceLanguage: this.sourceLanguage,
      inputMessage: input
    };
  }
}
