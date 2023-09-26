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

  constructor(private http: HttpClient, private router: Router) { }

  // Effettua il logout
  logout(): Observable<any> {
   
    return this.http.post(this.logoutUrl, null).pipe(
      tap(() => {

        this.enabled = false;
      })
    );
  }

  getDati(): Observable<any> {
    const url = `${this.apiUrl}`; // Modifica l'URL in base al percorso dei tuoi dati
    return this.http.get(url);
  }

  // Guardia di rotta per verificare l'autenticazione
  canActivate(): boolean {
    if (this.enabled) {
      return true; // L'utente è autenticato e può accedere alla rotta protetta
    } else {
      this.router.navigate(['/login']); // Reindirizza l'utente alla pagina di accesso se la variabile globale è false
      return false; // L'utente non può accedere alla rotta protetta
    }
  }
}
