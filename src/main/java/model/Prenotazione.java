package model;

import java.sql.Date;
import java.sql.Time;

public class Prenotazione {
    private int codPrenotazione;
    private String cognome;
    private String username;
    private int nPersone;
    private String ordinazioni; // Es. 1-17-33-42
    private Time orario;
    private Date data;

    public Prenotazione(){
    }

    public Prenotazione(String cognome, String username, int nPersone, String ordinazioni, Time orario, Date data) {
        this.cognome = cognome;
        this.username = username;
        this.nPersone = nPersone;
        this.ordinazioni = ordinazioni;
        this.orario = orario;
        this.data = data;
    }

    public Prenotazione(int codPrenotazione, String cognome, String username, int nPersone, String ordinazioni, Time orario, Date data) {
        this.codPrenotazione = codPrenotazione;
        this.cognome = cognome;
        this.username = username;
        this.nPersone = nPersone;
        this.ordinazioni = ordinazioni;
        this.orario = orario;
        this.data = data;
    }

    public int getCodPrenotazione() {
        return codPrenotazione;
    }

    public void setCodPrenotazione(int codPrenotazione) {
        this.codPrenotazione = codPrenotazione;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getnPersone() {
        return nPersone;
    }

    public void setnPersone(int nPersone) {
        this.nPersone = nPersone;
    }

    public String getOrdinazioni() {
        return ordinazioni;
    }

    public void setOrdinazioni(String ordinazioni) {
        this.ordinazioni = ordinazioni;
    }

    public Time getOrario() {
        return orario;
    }

    public void setOrario(Time orario) {
        this.orario = orario;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Prenotazione{" +
                "codPrenotazione=" + codPrenotazione +
                ", cognome='" + cognome + '\'' +
                ", username='" + username + '\'' +
                ", nPersone=" + nPersone +
                ", ordinazioni='" + ordinazioni + '\'' +
                ", orario=" + orario +
                '}';
    }
}
