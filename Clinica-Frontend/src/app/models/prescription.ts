import { Disease } from "./disease";
import { Pacient } from "./pacient";

export interface Prescription {
  numero: string;
  paciente: Pacient;
  doenca: Disease;
  nomeRemedio: string;
  dataConsulta: Date;
  tratamento: string;
  dataRevisao: Date;
  status: 'em andamento' | 'concluída' | 'atrasada';
  revisao?: boolean; // Opcional
}
