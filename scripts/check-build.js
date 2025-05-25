const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Iniciando verificação de build...');

// Verifica se todos os arquivos importados existem
function checkImports() {
  console.log('\n📦 Verificando imports...');
  
  const files = [
    'src/AppRoutes.tsx',
    'src/routes.tsx',
    'src/pages/Home.tsx',
    'src/pages/Modulos.tsx',
    'src/pages/Solucoes.tsx',
    'src/pages/NotFound.tsx'
  ];

  files.forEach(file => {
    if (!fs.existsSync(file)) {
      throw new Error(`❌ Arquivo não encontrado: ${file}`);
    }
    console.log(`✅ ${file} encontrado`);
  });
}

// Verifica se há erros de TypeScript
function checkTypeScript() {
  console.log('\n📝 Verificando TypeScript...');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('✅ TypeScript sem erros');
  } catch (error) {
    throw new Error('❌ Erros encontrados no TypeScript');
  }
}

// Tenta fazer um build local
function checkBuild() {
  console.log('\n🏗️  Testando build local...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build local bem sucedido');
  } catch (error) {
    throw new Error('❌ Falha no build local');
  }
}

// Verifica se há arquivos não commitados
function checkGitStatus() {
  console.log('\n📊 Verificando status do Git...');
  try {
    const status = execSync('git status --porcelain').toString();
    if (status) {
      console.warn('⚠️  Existem arquivos não commitados:');
      console.log(status);
      throw new Error('❌ Por favor, faça commit de todas as alterações antes de fazer push');
    }
    console.log('✅ Todos os arquivos estão commitados');
  } catch (error) {
    throw new Error('❌ Erro ao verificar status do Git');
  }
}

// Executa todas as verificações
try {
  checkImports();
  checkTypeScript();
  checkBuild();
  checkGitStatus();
  
  console.log('\n✨ Todas as verificações passaram! Pode fazer push com segurança.');
} catch (error) {
  console.error('\n❌ Erro encontrado:', error.message);
  process.exit(1);
} 