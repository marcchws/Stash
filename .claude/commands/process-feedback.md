---
description: Processa feedback do FEEDBACK.md e atualiza documentação automaticamente
allowed-tools: Read, Edit, Write, TodoWrite, Grep
---

# Processar Feedback e Atualizar Documentação

Você está executando o comando `/process-feedback` que automatiza todo o workflow de processamento de feedback.

## 📋 CONTEXTO DO PROCESSO

Leia primeiro a documentação do processo completo em @.claude/docs/feedback-process.md para entender as regras de versionamento e estrutura.

## 🎯 OBJETIVO

Processar feedback do arquivo `FEEDBACK.md` e garantir que TODA a documentação seja atualizada de forma consistente.

## 📂 ETAPA 1: LEITURA DO FEEDBACK

1. Leia o arquivo `@FEEDBACK.md`
2. Analise todos os pontos de feedback listados
3. Identifique quais comandos precisam ser modificados
4. Crie um plano de implementação usando TodoWrite

## 🔧 ETAPA 2: IMPLEMENTAÇÃO DAS MUDANÇAS

Para cada item do feedback:

1. Identifique qual arquivo de comando precisa ser modificado:
   - `.claude/commands/design/init.md`
   - `.claude/commands/design/feature.md`
   - `.claude/commands/design/integrate.md`
   - `.claude/commands/design/refine.md`
   - `.claude/commands/design/validate-spec.md`

2. Implemente as mudanças solicitadas usando Read e Edit
3. Marque como completed no TodoWrite após cada mudança

## 📊 ETAPA 3: DETERMINAR VERSÃO

Baseado nas mudanças implementadas, determine a nova versão seguindo Semantic Versioning:

### Critérios de Versionamento:

**MINOR (1.X.0)** - Use quando houver:
- Novas funcionalidades significativas
- Melhorias importantes em comandos existentes
- Integrações com novas ferramentas (ex: MCP)
- Mudanças na arquitetura
- Otimizações de UX (ex: perguntas simultâneas)

**PATCH (1.0.X)** - Use quando houver:
- Correções de bugs
- Ajustes menores em validações
- Melhorias de mensagens de erro
- Documentação apenas
- Pequenos refactors internos

**MAJOR (X.0.0)** - Raramente usado. Apenas para:
- Mudanças incompatíveis com versões anteriores
- Remoção de comandos inteiros
- Refatoração completa que quebra compatibilidade

### Como decidir:

1. Leia o CHANGELOG.md para ver a versão atual
2. Conte quantas mudanças são MINOR vs PATCH
3. Se houver pelo menos UMA mudança MINOR → incrementa MINOR
4. Se todas as mudanças forem PATCH → incrementa PATCH
5. Exemplo:
   - Versão atual: 1.3.0
   - Mudanças: 3 MINOR + 2 PATCH → Nova versão: **1.4.0**
   - Mudanças: Apenas 5 PATCH → Nova versão: **1.3.1**

## 📝 ETAPA 4: ATUALIZAR CHANGELOG.md (OBRIGATÓRIO)

1. Leia o arquivo `@.claude/CHANGELOG.md`

2. Adicione nova entrada NO TOPO (após a linha `---` mas antes da versão anterior):

```markdown
## [X.Y.Z] - YYYY-MM-DD

### 🎯 Título Descritivo

Parágrafo resumindo o contexto das mudanças implementadas a partir do feedback.

### Categoria Apropriada

#### Subcategoria 1

Detalhes específicos:
- Lista de mudanças
- Código ANTES/DEPOIS quando relevante
- Arquivos modificados
- Benefícios/impacto

#### Subcategoria 2

[...]

---

## [Versão Anterior] - Data
[...]
```

3. **Categorias a usar** (escolha as apropriadas):
   - 🎉 **Adicionado** - novas funcionalidades
   - 🔄 **Modificado** - mudanças em funcionalidades existentes
   - ✅ **Corrigido** - correções de bugs
   - ❌ **Removido** - funcionalidades removidas
   - 📝 **Documentação** - mudanças apenas em docs
   - 🚀 **Performance** - melhorias de performance

4. **Incluir sempre**:
   - Exemplos de código quando aplicável
   - Comparações ANTES/DEPOIS
   - Lista de arquivos modificados
   - Justificativa das mudanças
   - Impacto/benefícios para o usuário

## 📘 ETAPA 5: ATUALIZAR README.md (OBRIGATÓRIO)

1. Leia o arquivo `@.claude/README.md`

2. **Atualizar versão** em 2 lugares:
   - Cabeçalho: `> Versão X.Y.Z | Última atualização: YYYY-MM-DD`
   - Rodapé: `**Versão**: X.Y.Z`

3. **Atualizar seção "O Que Há de Novo"**:
   - Substituir a seção atual pela nova versão
   - Resumir as principais mudanças (5-7 bullet points no máximo)
   - Usar emojis para destaque visual
   - Focar nos benefícios para o usuário
   - Manter conciso e objetivo

4. **Atualizar comandos afetados**:
   - Se `/design:init` mudou → atualizar sua seção com badge 🆕
   - Se `/design:feature` mudou → atualizar sua seção
   - Se `/design:refine` mudou → atualizar sua seção
   - Se `/design:integrate` mudou → atualizar sua seção
   - Adicionar "**🆕 Melhorias vX.Y:**" nas seções modificadas

5. **Atualizar exemplos de código**:
   - Garantir que todos os exemplos refletem as mudanças
   - Adicionar novos exemplos se necessário

6. **Atualizar estrutura de projeto** se arquitetura mudou:
   - Diagrama ASCII
   - Comentários explicativos

7. **Substituir todas as referências à versão antiga**:
   - Use Grep para encontrar: `grep -r "vX\.Y" ".claude/README.md"`
   - Substitua `vX.Y` por `vX.Z` (nova versão)

## ✅ ETAPA 6: VALIDAÇÃO FINAL

Use Grep para validar consistência:

```bash
# 1. Verificar versão no CHANGELOG
grep "## \[" .claude/CHANGELOG.md

# 2. Verificar versão no README (deve aparecer 2x)
grep -i "versão" .claude/README.md

# 3. Procurar referências à versão antiga (não deve aparecer)
grep "vX\.Y\.Z" .claude/README.md
```

**Checklist de validação:**
- [ ] CHANGELOG.md tem nova entrada com versão X.Y.Z
- [ ] README.md cabeçalho tem versão X.Y.Z
- [ ] README.md rodapé tem versão X.Y.Z
- [ ] Seção "O Que Há de Novo" foi atualizada
- [ ] Comandos afetados foram atualizados
- [ ] Nenhuma referência à versão antiga permanece
- [ ] Ambos documentos estão sincronizados

## 📊 ETAPA 7: RELATÓRIO FINAL

Após completar todas as etapas, apresente um relatório:

```
✅ Feedback Processado - Versão X.Y.Z

## 📋 Mudanças Implementadas
- [Lista de mudanças nos comandos]

## 📝 Documentação Atualizada
- ✅ CHANGELOG.md (nova entrada v.X.Y.Z)
- ✅ README.md (versão e "O Que Há de Novo" atualizados)

## 🔍 Validação
- ✅ Consistência de versionamento verificada
- ✅ Referências antigas removidas
- ✅ Ambos documentos sincronizados

## 📊 Arquivos Modificados
- .claude/commands/design/[...]
- .claude/CHANGELOG.md
- .claude/README.md
```

## ⚠️ REGRAS CRÍTICAS

1. **NUNCA** considere o processo completo sem atualizar AMBOS: CHANGELOG.md E README.md
2. **SEMPRE** use Grep para validar consistência de versões
3. **SEMPRE** mantenha a mesma versão em CHANGELOG e README
4. **SEMPRE** substitua TODAS as referências à versão antiga
5. **SEMPRE** adicione exemplos ANTES/DEPOIS quando houver mudanças significativas
6. **SEMPRE** justifique as mudanças com contexto e benefícios

## 🎯 IMPORTANTE

Este comando foi criado para automatizar o processo de feedback. O arquivo `.claude/docs/feedback-process.md` contém a documentação completa do processo e deve ser consultado para referência.

**Workflow ideal:**
1. Usuário atualiza `FEEDBACK.md` com melhorias
2. Usuário roda `/process-feedback`
3. Comando processa tudo automaticamente
4. Documentação fica 100% sincronizada
