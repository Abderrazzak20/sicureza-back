import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {
  private logoutUrl = 'http://localhost:8080/logout';
  private apiUrl = 'http://localhost:8080/prodotti/';

  // Variabile globale per memorizzare lo stato di autenticazione
  public enabled = false;
  private enabledModified = false; // Aggiungi una variabile di controllo


  constructor(private http: HttpClient, private router: Router) {
    // Recupera il valore da localStorage quando il servizio viene inizializzato
    const enabled = localStorage.getItem('enabled');
    this.enabled = enabled === 'true';
  }

  // Effettua il logout
  logout(): Observable<any> {
    return this.http.post(this.logoutUrl, null).pipe(
      tap(() => {
        this.enabled = false;
        // Salva il nuovo valore in localStorage quando disconnetti l'utente
        localStorage.setItem('enabled', this.enabled.toString());
      })
    );
  }

  getDati(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }

  // Guardia di rotta per verificare l'autenticazione
  canActivate(): boolean {
    // Controlla se "enabled" è impostato su 'true' nell'URL
    if (this.enabled ) {
      return true; // L'utente è autenticato e può accedere alla rotta protetta
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
