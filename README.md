# 💰 Gerenciamento Financeiro

Um aplicativo moderno de gerenciamento financeiro construído com React, TypeScript e Capacitor para compilação mobile.

## 🚀 Funcionalidades

- ✅ **Transações**: Visualize e gerencie suas transações financeiras
- 🔍 **Pesquisa**: Busque transações por descrição ou categoria
- 📊 **Filtros**: Filtre por receitas, despesas ou todas as transações
- 📱 **Mobile Ready**: Preparado para compilação Android/iOS com Capacitor
- 🎨 **Interface Moderna**: Design limpo e responsivo com TailwindCSS

## 🛠️ Tecnologias

- **React 18** com TypeScript
- **TailwindCSS** para styling
- **Lucide React** para ícones
- **Capacitor** para compilação mobile

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

## 📱 Compilação Mobile

### Pré-requisitos
- Node.js >= 20.0.0 (para Capacitor)
- Android Studio (para Android)
- Xcode (para iOS)

### Android
```bash
# Adicione a plataforma Android
npx cap add android

# Compile o projeto
npm run build

# Sincronize com Capacitor
npx cap sync

# Abra no Android Studio
npx cap open android
```

### iOS
```bash
# Adicione a plataforma iOS
npx cap add ios

# Compile o projeto
npm run build

# Sincronize com Capacitor
npx cap sync

# Abra no Xcode
npx cap open ios
```

## 🎯 Próximas Funcionalidades

- [ ] Dashboard com gráficos
- [ ] Categorias personalizadas
- [ ] Orçamentos e metas
- [ ] Relatórios detalhados
- [ ] Sincronização com bancos
- [ ] Backup na nuvem

## 📄 Licença

MIT License 