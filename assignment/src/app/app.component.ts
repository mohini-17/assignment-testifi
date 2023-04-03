import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  iban = '';
  result: boolean | null = null;


  validateIban(iban: string): boolean {
    // Remove spaces and convert to upper case
    iban = iban.replace(/ /g, '').toUpperCase();
  
    // Check that the country code is valid
    if (iban.substr(0, 2) !== 'ME') {
      return false;
    }
  
    // Check that the length is correct
    if (iban.length !== 22) {
      return false;
    }
  
    // Rearrange the IBAN and convert letters to digits
    const rearrangedIban = iban.substr(4) + iban.substr(0, 4);
    let digitsIban = '';
    for (let i = 0; i < rearrangedIban.length; i++) {
      const charCode = rearrangedIban.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        digitsIban += (charCode - 55).toString();
      } else {
        digitsIban += rearrangedIban.charAt(i);
      }
    }
  
    // Calculate the checksum
    let checksum = parseInt(digitsIban.substr(0, 2));
    for (let i = 2; i < digitsIban.length; i++) {
      const digit = parseInt(digitsIban.charAt(i));
      checksum = (checksum * 10 + digit) % 97;
    }
  
    return checksum === 1;
  }
  
  //validate the result
  validate() {
    this.result = this.validateIban(this.iban);
  }
  
}
