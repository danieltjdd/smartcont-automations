# Validador de NCM - Sistema de Confronto Inteligente

Sistema para validação e confronto de códigos NCM (Nomenclatura Comum do Mercosul) com a tabela oficial.

## Funcionalidades

- Carregamento da tabela oficial de NCM
- Carregamento de planilha do usuário
- Comparação inteligente usando fuzzy matching
- Geração de relatório com resultados coloridos

## Requisitos

- Python 3.8 ou superior
- Bibliotecas listadas em `requirements.txt`

## Instalação

1. Clone este repositório
2. Instale as dependências:
```bash
pip install -r requirements.txt
```

## Como Usar

1. Execute o programa:
```bash
python interface.py
```

2. Na interface:
   - Carregue a tabela oficial de NCM (pode ser baixada do portal Siscomex)
   - Carregue sua planilha com os NCMs a serem validados
   - Clique em "Confrontar e Gerar Relatório"

3. O sistema irá gerar um relatório Excel com:
   - NCM do usuário
   - Descrição do usuário
   - NCM oficial correspondente
   - Descrição oficial correspondente
   - Score de similaridade
   - Status (Verde/Amarelo/Vermelho)

## Estrutura do Projeto

- `interface.py`: Interface gráfica principal
- `download_ncm.py`: Funções para download da tabela oficial
- `comparador.py`: Lógica de comparação fuzzy
- `relatorio.py`: Geração do relatório Excel

## Formato da Planilha do Usuário

A planilha do usuário deve conter as seguintes colunas:
- NCM: código NCM
- Descricao: descrição do produto

## Status do Relatório

- Verde: correspondência segura (acima de 80% de similaridade)
- Amarelo: correspondência parcial (50% a 80%)
- Vermelho: sem correspondência (abaixo de 50%) 