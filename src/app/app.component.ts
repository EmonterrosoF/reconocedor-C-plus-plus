import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

const tokens = {
  int: 'reservada',
  string: 'reservada',
  float: 'reservada',
  bool: 'reservada',
  if: 'reservada',
  else: 'reservada',
  for: 'reservada',
  switch: 'reservada',
  case: 'reservada',
  break: 'reservada',
  default: 'reservada',
  '+': 'simbolo',
  '-': 'simbolo',
  '*': 'simbolo',
  '/': 'simbolo',
  '=': 'simbolo',
  '<': 'simbolo',
  '>': 'simbolo',
  '>=': 'simbolo',
  '<=': 'simbolo',
  '==': 'simbolo',
  ';': 'simbolo',
  '(': 'simbolo',
  ')': 'simbolo',
  '{': 'simbolo',
  '}': 'simbolo',
  ':': 'simbolo',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'validador-cPlusPlus'
  code = ''
  reconocedor!: []
  formValidator!: FormGroup
  @ViewChild('result') result!: ElementRef

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formValidator = this.fb.group({
      validator: ['', Validators.required],
    })
  }

  submitValidator() {
    if (this.formValidator.valid) {
      this.verifyLexico(this.formValidator.get('validator')?.value)
    }
  }

  verifyLexico(value: string): void {
    const verifyNumber = /^([0-9])*$/
    const token = value
      .split(/\s+/)
      .filter((t) => t.length > 0)
      .map((t) => {
        // if (ignore[t as keyof typeof ignore]) return ''
        if (verifyNumber.test(t)) return `[${t}, numero]`
        if (t.startsWith('"')) return `[${t}, valor]`
        return tokens[t as keyof typeof tokens]
          ? `[${t}, ${tokens[t as keyof typeof tokens]}]`
          : `[${t}, identificador]`
      })

    this.setResult(token)
  }

  setResult(token: any[]) {
    let text = ''
    token.forEach((t) => {
      text += t + '\n'
    })

    this.result.nativeElement.innerText = text
    console.log(this.result.nativeElement)
  }

  onChange(e: any) {
    const textArea = document.getElementById('textArea')

    if (tokens[e as keyof typeof tokens] == 'reservada') {
      if (textArea?.style.color !== undefined) {
        textArea.style.color = 'yellow'
      }
    } else {
      if (textArea?.style.color !== undefined) textArea.style.color = 'white'
    }
  }
}
