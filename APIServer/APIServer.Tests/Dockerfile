#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:5.0-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["APIServer.Tests/APIServer.Tests.csproj", "APIServer.Tests/"]
COPY ["APIServer.csproj", ""]
RUN dotnet restore "APIServer.Tests/APIServer.Tests.csproj"
COPY . .

FROM build AS test
WORKDIR /src
ARG BuildId
LABEL test=${BuildId} 
RUN dotnet test -c Release --results-directory /testresults --logger "trx;LogFileName=test_results.trx"  APIServer.Tests/APIServer.Tests.csproj