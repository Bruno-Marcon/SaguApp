export const getOccurrences = async () => {
  try {
    const response = await fetch('http://api.sagu.app.br/api/v1/occurrencies');
    const data = await response.json();
    
    // Retorna o primeiro item da lista de ocorrências
    return data.data[0]?.attributes;
  } catch (error) {
    console.error("Erro ao buscar dados da ocorrência:", error);
    throw new Error('Erro ao buscar dados da ocorrência');
  }
};