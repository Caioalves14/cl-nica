export interface Prescription {
  numero: number;
  paciente: string;          // Pode ser o CPF ou ID, conforme o backend
  doenca: string;            // Pode ser o CID ou ID, conforme o backend
  medicamento: string;
  dataConsulta: Date;
  tratamento: string;
  status: string;            // Agora é uma string, visto que não há enum no backend
}
