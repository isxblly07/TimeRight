package com.itb.inf2fm.timeright.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamentos")
public class Agendamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome do cliente é obrigatório")
    @Column(name = "nome_cliente", nullable = false)
    private String nomeCliente;
    
    @NotBlank(message = "Telefone é obrigatório")
    @Column(nullable = false)
    private String telefone;
    
    @NotNull(message = "Data e hora são obrigatórias")
    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;
    
    @Column(length = 500)
    private String observacoes;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAgendamento status = StatusAgendamento.AGENDADO;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servico_id", nullable = false)
    private Servico servico;
    
    public enum StatusAgendamento {
        AGENDADO("Agendado"),
        CONFIRMADO("Confirmado"),
        REALIZADO("Realizado"),
        CANCELADO("Cancelado");
        
        private final String descricao;
        
        StatusAgendamento(String descricao) {
            this.descricao = descricao;
        }
        
        public String getDescricao() {
            return descricao;
        }
    }
    
    // Construtor vazio
    public Agendamento() {}
    
    // Construtor com parâmetros
    public Agendamento(String nomeCliente, String telefone, LocalDateTime dataHora, Servico servico) {
        this.nomeCliente = nomeCliente;
        this.telefone = telefone;
        this.dataHora = dataHora;
        this.servico = servico;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNomeCliente() {
        return nomeCliente;
    }
    
    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }
    
    public String getTelefone() {
        return telefone;
    }
    
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    
    public LocalDateTime getDataHora() {
        return dataHora;
    }
    
    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
    
    public String getObservacoes() {
        return observacoes;
    }
    
    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
    
    public StatusAgendamento getStatus() {
        return status;
    }
    
    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }
    
    public Servico getServico() {
        return servico;
    }
    
    public void setServico(Servico servico) {
        this.servico = servico;
    }
}