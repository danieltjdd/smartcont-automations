# Validador de NCM com GPT

Este sistema valida códigos NCM (Nomenclatura Comum do Mercosul) usando a API OpenAI GPT para verificar se os códigos estão corretos para as descrições fornecidas.

## Estrutura de Arquivos

```
.
├── entrada/
│   ├── planilha_usuario.xlsx    # Planilha com NCMs do usuário
│   └── Tabela_NCM_Vigente.xlsx # Tabela oficial de NCMs
├── saida/                       # Diretório para relatórios gerados
├── ncm_validator.py            # Código principal
├── requirements.txt            # Dependências do projeto
└── README.md                   # Este arquivo
```

## Requisitos

- Python 3.8 ou superior
- Chave de API da OpenAI
- Dependências listadas em requirements.txt

## Instalação

1. Clone este repositório
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure sua chave de API da OpenAI no arquivo `ncm_validator.py`

## Formato das Planilhas

### planilha_usuario.xlsx
- Deve conter duas colunas:
  1. NCM do usuário
  2. Descrição do produto

### Tabela_NCM_Vigente.xlsx
- Deve conter duas colunas:
  1. Código NCM
  2. Descrição oficial

## Uso

1. Coloque seus arquivos Excel na pasta `entrada/`
2. Execute o script:
   ```bash
   python ncm_validator.py
   ```
3. O relatório será gerado na pasta `saida/`

## Funcionalidades

- Processamento em lotes para respeitar limites da API
- Conversão automática de tipos de dados
- Sistema de retry para erros de API
- Logging completo das operações
- Relatório detalhado em Excel

## Logs

O sistema gera logs detalhados em:
- Console (stdout)
- Arquivo `ncm_validator.log` 