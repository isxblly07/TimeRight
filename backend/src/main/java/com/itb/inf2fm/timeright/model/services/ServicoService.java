package com.itb.inf2fm.timeright.model.services;

import com.itb.inf2fm.timeright.model.entity.Servico;
import com.itb.inf2fm.timeright.model.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServicoService {
    
    @Autowired
    private ServicoRepository servicoRepository;
    
    public List<Servico> listarTodos() {
        return servicoRepository.findAll();
    }
    
    public List<Servico> listarPorCategoria(Long categoriaId) {
        return servicoRepository.findByCategoriaId(categoriaId);
    }
    
    public Optional<Servico> buscarPorId(Long id) {
        return servicoRepository.findById(id);
    }
    
    public Servico salvar(Servico servico) {
        return servicoRepository.save(servico);
    }
    
    public void deletar(Long id) {
        servicoRepository.deleteById(id);
    }
}