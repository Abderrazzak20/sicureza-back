import { Component, OnInit } from '@angular/core';
import { AutenticazioneService } from '../autenticazione.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginRiuscito : boolean = false;
  dati: any;

  constructor(private service: AutenticazioneService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.service.getDati().subscribe(
      (response) => {
        this.dati = response;
        console.log("Dati ottenuti con successo:", this.dati);
      },
      (error) => {
        console.error("Errore durante il recupero dei dati", error);
      }
    );
  }

  onSubmit(): void {
    console.log("Valori:", this.username, this.password);

  

    this.dati.forEach((element: any) => {
      if (element.user === this.username && element.password === this.password) {
        this.loginRiuscito = true;
      }
    });

    if (this.loginRiuscito) {
      console.log("Login riuscito!");
      this.service.enabled = true;
      this.router.navigate(['/about']);
    } else {
      console.log("Login fallito. Credenziali non valide.");
      console.log("No good identifier");
    }
  }

  
}
