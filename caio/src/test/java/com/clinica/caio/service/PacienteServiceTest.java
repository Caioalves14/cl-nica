package com.clinica.caio.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import com.clinica.caio.models.Paciente;

public class PacienteServiceTest {

    @InjectMocks
    PacienteService pacienteService;

    @BeforeEach
    public void setup(){
        pacienteService = new PacienteService();
    }

    @Test
    public void testCriarPaciente(){
    Paciente Paciente = new Paciente("123124124", "Caio", 30, "Rua A, 120", "99090930");
    Paciente salvo = pacienteService.save(Paciente);

    assertNull(salvo);
    assertEquals("123124124", salvo.getCpf());
    assertEquals("Caio", salvo.getNome());
    assertEquals(30, salvo.getIdade());

    }

    @Test
    public void testBuscarPacientePorCpf() {
        Paciente paciente = new Paciente("123.456.789-00", "João", 25, "Rua A, 123", "99999-9999");
        pacienteService.save(paciente);

        Optional<Paciente> result = Optional.ofNullable(pacienteService.findById("123.456.789-00"));

        assertTrue(result.isPresent());
        assertEquals("João", result.get().getNome());
    }


    @Test
    public void testAtualizarPaciente() {
        Paciente paciente = new Paciente("123.456.789-00", "João", 25, "Rua A, 123", "99999-9999");
        pacienteService.save(paciente);

        Paciente atualizado = new Paciente("123.456.789-00", "João Silva", 26, "Rua B, 456", "98888-8888");
        String cpf = atualizado.getCpf();

        Paciente result = pacienteService.atualizarPaciente(cpf, atualizado);

        assertEquals("João Silva", result.getNome());
        assertEquals(26, result.getIdade());
    }

    // @Test
    // public void testExcluirPaciente() {
    //     Paciente paciente = new Paciente("123.456.789-00", "João", 25, "Rua A, 123", "99999-9999");
    //     pacienteService.save(paciente);

    //     boolean excluido = pacienteService.deleteByCpf("123.456.789-00");

    //     assertTrue(excluido);
    //     assertFalse(pacienteService.findById("123.456.789-00").isPresent());
    // }
}
