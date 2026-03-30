param(
    [string]$PostgresBin = "C:\Program Files\PostgreSQL\17\bin",
    [string]$SuperUser = "postgres",
    [string]$SuperPassword = "EducaProPg#2026",
    [string]$AppDatabase = "HMGEDUCAPRO",
    [string]$AppUser = "HMGPEDRO",
    [string]$AppPassword = "Pa220223*",
    [string]$PgHost = "127.0.0.1",
    [int]$Port = 5432
)

$psql = Join-Path $PostgresBin "psql.exe"

if (-not (Test-Path $psql)) {
    throw "psql.exe nao encontrado em $PostgresBin. Instale o PostgreSQL 17 ou ajuste -PostgresBin."
}

$env:PGPASSWORD = $SuperPassword

$roleExists = ((& $psql -h $PgHost -p $Port -U $SuperUser -d postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname = '$AppUser';") | Out-String).Trim()

if ($LASTEXITCODE -ne 0) {
    throw "Falha ao consultar as roles do PostgreSQL."
}

if ($roleExists -eq "1") {
    & $psql -h $PgHost -p $Port -U $SuperUser -d postgres -v ON_ERROR_STOP=1 -c "ALTER ROLE `"$AppUser`" WITH LOGIN PASSWORD '$AppPassword';"
} else {
    & $psql -h $PgHost -p $Port -U $SuperUser -d postgres -v ON_ERROR_STOP=1 -c "CREATE ROLE `"$AppUser`" WITH LOGIN PASSWORD '$AppPassword';"
}

if ($LASTEXITCODE -ne 0) {
    throw "Falha ao criar ou atualizar o usuario '$AppUser'."
}

$databaseExists = ((& $psql -h $PgHost -p $Port -U $SuperUser -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = '$AppDatabase';") | Out-String).Trim()

if ($LASTEXITCODE -ne 0) {
    throw "Falha ao consultar os bancos existentes no PostgreSQL."
}

if ($databaseExists -ne "1") {
    & $psql -h $PgHost -p $Port -U $SuperUser -d postgres -v ON_ERROR_STOP=1 -c ('CREATE DATABASE "' + $AppDatabase + '" OWNER "' + $AppUser + '";')

    if ($LASTEXITCODE -ne 0) {
        throw "Falha ao criar o banco '$AppDatabase'."
    }
}

Write-Host "Banco '$AppDatabase' e usuario '$AppUser' preparados com sucesso."
