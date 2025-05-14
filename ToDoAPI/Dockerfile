#Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "ToDoAPI.csproj" --disable-parallel
RUN dotnet publish "ToDoAPI.csproj" -c release -o /out --no-restore

#Serve stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /out .

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "ToDoAPI.dll"]
