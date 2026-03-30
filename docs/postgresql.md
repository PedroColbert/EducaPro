# PostgreSQL no EducaPro

O projeto foi preparado para usar PostgreSQL como banco principal.

## Padrao local adotado

- Host: `127.0.0.1`
- Porta: `5432`
- Banco: `HMGEDUCAPRO`
- Usuario: `HMGPEDRO`
- Senha: `Pa220223*`
- Schema: `public`

Esses valores ja estao refletidos em `.env.example` e no `.env` local atual.

## Fluxo local recomendado

1. Instale o PostgreSQL 17.
2. Rode `scripts/setup-postgres.ps1` para criar ou atualizar o usuario e o banco da aplicacao.
3. Rode `php artisan migrate --seed`.
4. Rode `php artisan serve`.

Observacao:
Se a senha tiver caracteres especiais como `#`, mantenha o valor entre aspas no `.env`.

## Fallback via container

Se preferir usar container, o projeto inclui `docker-compose.postgres.yml`.

Com Docker Desktop ativo:

```powershell
docker compose -f docker-compose.postgres.yml up -d
```

Depois execute:

```powershell
php artisan migrate --seed
```

## Testes uteis

Conexao PDO no Laravel:

```powershell
php artisan tinker --execute="DB::connection()->getPdo();"
```

Status das migrations:

```powershell
php artisan migrate:status
```

Reseed completo:

```powershell
php artisan migrate:fresh --seed
```
