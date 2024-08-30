export interface Pacient {
  cpf: string;
  nome: string;
  idade: number;
  endereco: string;
  telefone: string;
  revisao?: boolean; // Adicione esta linha
}
