package com.clinica.caio.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Paciente {
    @Id
    private String cpf;
    private String nome;
    private int idade;
    private String endereco;
    private String telefone;
    private boolean emTratamento;

    public boolean isEmTratamento() {
        return emTratamento;
    }

    public void setEmTratamento(boolean emTratamento) {
        this.emTratamento = emTratamento;
    }

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
    private List<Prescricao> prescricoes;

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public List<Prescricao> getPrescricoes() {
        return prescricoes;
    }

    public void setPrescricoes(List<Prescricao> prescricoes) {
        this.prescricoes = prescricoes;
    }

    
}
