package com.clinica.caio.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import com.clinica.caio.models.Doenca;
import com.clinica.caio.models.Paciente;
import com.clinica.caio.models.Prescricao;

public class PrescricaoServiceTest {

    @InjectMocks

    
    private PrescricaoService prescricaoService;
    private Paciente paciente;
    private Doenca doenca;

    @BeforeEach
    public void setup() {
        prescricaoService = new PrescricaoService();
        paciente = new Paciente("123.456.789-00", "João", 25, "Rua A, 123", "99999-9999");
        doenca = new Doenca("A00", "Cólera", "Infecção intestinal grave");
    }

    @Test
    public void testCadastrarPrescricao() {
        Prescricao prescricao = new Prescricao(1, paciente, doenca, "Remédio X", LocalDate.now(), "2 vezes ao dia", "Em andamento");
        Long id = prescricao.getNumero();
        Prescricao result = prescricaoService.concluirPrescricao(id);

        assertNotNull(result);
        assertEquals(1, result.getNumero());
        assertEquals("Remédio X", result.getNomeRemedio());
    }

    @Test
    public void testAtualizarPrescricao() {
        Prescricao prescricao = new Prescricao(1, paciente, doenca, "Remédio X", LocalDate.now(), "2 vezes ao dia", "Em andamento");
        Long id = prescricao.getNumero();
        prescricaoService.concluirPrescricao(id);

        prescricao.setStatus("Concluída");
        Prescricao result = prescricaoService.atualizarPrescricao(id, prescricao);

        assertEquals("Concluída", result.getStatus());
    }

    // @Test
    // public void testGerarRelatorio() {
    //     Prescricao prescricao = new Prescricao(1, paciente, doenca, "Remédio X", LocalDate.now(), "2 vezes ao dia", "Concluída");
    //     Long id = prescricao.getNumero();
    //     prescricaoService.concluirPrescricao(id);

    //     String relatorio = prescricaoService.gerarRelatorio(1);

    //     assertNotNull(relatorio);
    //     assertTrue(relatorio.contains("Remédio X"));
    //     assertTrue(relatorio.contains("Concluída"));
    // }
}
