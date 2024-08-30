package com.clinica.caio.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import com.clinica.caio.models.Doenca;

public class DoencaServiceTest {

    @InjectMocks
    private DoencaService doencaService;

    @BeforeEach
    public void setup() {
        doencaService = new DoencaService();
    }

    @Test
    public void testCadastrarDoenca() {
        Doenca doenca = new Doenca("A00", "Cólera", "Infecção intestinal grave");
        Doenca result = doencaService.salvar(doenca);

        assertNotNull(result);
        assertEquals("A00", result.getCid());
        assertEquals("Cólera", result.getNome());
    }

    @Test
    public void testBuscarDoencaPorCid() {
        Doenca doenca = new Doenca("A00", "Cólera", "Infecção intestinal grave");
        doencaService.salvar(doenca);

        Optional<Doenca> result = doencaService.buscarPorId("A00");

        assertTrue(result.isPresent());
        assertEquals("Cólera", result.get().getNome());
    }

    // @Test
    // public void testAtualizarDoenca() {
    //     Doenca doenca = new Doenca("A00", "Cólera", "Infecção intestinal grave");
    //     doencaService.salvar(doenca);

    //     Doenca atualizado = new Doenca("A00", "Cólera Grave", "Infecção mais grave");
    //     Doenca result = doencaService.atualizarDoenca(atualizado);

    //     assertEquals("Cólera Grave", result.getNome());
    //     assertEquals("Infecção mais grave", result.getDescricao());
    // }

    @Test
    public void testExcluirDoenca() {
        Doenca doenca = new Doenca("A00", "Cólera", "Infecção intestinal grave");
        doencaService.salvar(doenca);

        boolean excluido = doencaService.deletar("A00");

        assertTrue(excluido);
        assertFalse(doencaService.buscarPorId("A00").isPresent());
    }
}
