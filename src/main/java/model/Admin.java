package model;

public class Admin {
    private String codAdmin;
    private String nome;

    public Admin() {
    }

    public Admin(String codAdmin, String nome) {
        this.codAdmin = codAdmin;
        this.nome = nome;
    }

    public String getCodAdmin() {
        return codAdmin;
    }

    public void setCodAdmin(String codAdmin) {
        this.codAdmin = codAdmin;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
