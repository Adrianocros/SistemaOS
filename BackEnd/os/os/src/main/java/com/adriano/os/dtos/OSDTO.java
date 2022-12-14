package com.adriano.os.dtos;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;

import com.adriano.os.domain.OS;
import com.adriano.os.domain.enuns.Prioridade;
import com.adriano.os.domain.enuns.Status;
import com.fasterxml.jackson.annotation.JsonFormat;


public class OSDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	
	private Integer id;
	
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime dataAbertura;
	
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime dataFechamento;
	
	@NotEmpty(message = "O campo observação é obrigatorio! ")
	private String observacoes;	
	
	
	private Integer tecnico;
	private Integer cliente;
	
	
	private Integer prioridade;
	private Integer status;
	
	public OSDTO() {
		super();
	
	}

	public OSDTO(OS obj) {
		super();
		this.id = obj.getId();
		this.dataAbertura = obj.getDataAbertura();
		this.dataFechamento = obj.getDataFechamento();
		this.observacoes = obj.getObservacoes();
		this.tecnico = obj.getTecnico().getId();
		this.cliente = obj.getCliente().getId();
		this.prioridade = obj.getPrioridade().getCod();
		this.status = obj.getStatus().getCod();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getDataAbertura() {
		return dataAbertura;
	}

	public void setDataAbertura(LocalDateTime dataAbertura) {
		this.dataAbertura = dataAbertura;
	}

	public LocalDateTime getDataFechamento() {
		return dataFechamento;
	}

	public void setDataFechamento(LocalDateTime dataFechamento) {
		this.dataFechamento = dataFechamento;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

	public Integer getTecnico() {
		return tecnico;
	}

	public void setTecnico(Integer tecnico) {
		this.tecnico = tecnico;
	}

	public Integer getCliente() {
		return cliente;
	}

	public void setCliente(Integer cliente) {
		this.cliente = cliente;
	}

	public Prioridade getPrioridade() {
		return Prioridade.toEnum(this.prioridade);
	}

	public void setPrioridade(Integer prioridade) {
		this.prioridade = prioridade;
	}

	public Status getStatus() {
		return Status.toEnum(this.status);
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	
	
	
	
	

}
