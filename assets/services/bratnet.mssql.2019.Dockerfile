FROM mcr.microsoft.com/mssql/server:2019-latest
EXPOSE 1433
ENV ACCEPT_EULA="Y"
ENV MSSQL_PID="Developer"
ENV MSSQL_SA_PASSWORD="123%aoeuI"
