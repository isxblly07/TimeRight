package com.itb.inf2fm.timeright.model.services;

import com.itb.inf2fm.timeright.model.entity.Usuario;
import com.itb.inf2fm.timeright.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
    
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    
    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    
    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }
    
    public boolean existePorEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }
}