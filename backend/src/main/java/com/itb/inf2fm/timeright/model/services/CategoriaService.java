package com.itb.inf2fm.timeright.model.services;

import com.itb.inf2fm.timeright.model.entity.Categoria;
import com.itb.inf2fm.timeright.model.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public List<Categoria> listarTodas() {
        return categoriaRepository.findAllByOrderByNomeAsc();
    }
    
    public Optional<Categoria> buscarPorId(Long id) {
        return categoriaRepository.findById(id);
    }
    
    public Categoria salvar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    
    public void deletar(Long id) {
        categoriaRepository.deleteById(id);
    }
    
    public boolean existePorNome(String nome) {
        return categoriaRepository.existsByNomeIgnoreCase(nome);
    }
}