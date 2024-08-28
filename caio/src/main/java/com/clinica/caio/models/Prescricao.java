package com.clinica.caio.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Prescricao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long numero;

    @ManyToOne
    @JoinColumn(name = "paciente_cpf")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "doenca_cid")
    private Doenca doenca;

    private String nomeRemedio;
    private LocalDate dataConsulta;
    private String tratamento;
    private LocalDate dataRevisao;
    private String status;
    public long getNumero() {
        return numero;
    }
    public void setNumero(long numero) {
        this.numero = numero;
    }
    public Paciente getPaciente() {
        return paciente;
    }
    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }
    public Doenca getDoenca() {
        return doenca;
    }
    public void setDoenca(Doenca doenca) {
        this.doenca = doenca;
    }
    public String getNomeRemedio() {
        return nomeRemedio;
    }
    public void setNomeRemedio(String nomeRemedio) {
        this.nomeRemedio = nomeRemedio;
    }
    public LocalDate getDataConsulta() {
        return dataConsulta;
    }
    public void setDataConsulta(LocalDate dataConsulta) {
        this.dataConsulta = dataConsulta;
    }
    public String getTratamento() {
        return tratamento;
    }
    public void setTratamento(String tratamento) {
        this.tratamento = tratamento;
    }
    public LocalDate getDataRevisao() {
        return dataRevisao;
    }
    public void setDataRevisao(LocalDate dataRevisao) {
        this.dataRevisao = dataRevisao;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    
}
