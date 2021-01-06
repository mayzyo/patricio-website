#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["APIServer.Tests/APIServer.Tests.csproj", "APIServer.Tests/"]
COPY ["APIServer.csproj", ""]
RUN dotnet restore "./APIServer.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "APIServer.csproj" -c Release -o /app/build

FROM build AS test
WORKDIR /src/APIServer.Tests
RUN dotnet tool install dotnet-reportgenerator-globaltool --tool-path /dotnetglobaltools
LABEL unittestlayer=true
RUN dotnet test --logger "trx;LogFileName=loggedresults.xml" --collect "XPlat Code Coverage" --results-directory /out/testresults
RUN /dotnetglobaltools/reportgenerator "-reports:/out/testresults/**/coverage.cobertura.xml" "-targetdir:/out/testresults/coverage/reports" "-reporttypes:HTMLInline;HTMLChart"

FROM build AS publish
RUN dotnet publish "APIServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "APIServer.dll"]