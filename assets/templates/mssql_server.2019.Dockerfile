# Upstream image
## ------
FROM mcr.microsoft.com/mssql/server:2019-latest

# Metadata
## ------
LABEL service.author="pavlos"
LABEL service.name="mssql_server/2019"
LABEL service.tag="0.1"
LABEL service.upstream.repository="mcr.microsoft.com"
LABEL service.upstream.service="mssql/server"
LABEL service.upstream.version="2019"
LABEL service.upstream.tag="2019-latest"

# Service
## ------
EXPOSE 1433
ENV ACCEPT_EULA="Y"
ENV MSSQL_PID="Developer"
ENV DQUACK_SERVICE_USERNAME="SA"
ENV DQUACK_SERVICE_PASSWORD="Pavlos1993"
ENV MSSQL_SA_PASSWORD=$DQUACK_SERVICE_PASSWORD

# Add sqlcmd to the path
ENV PATH=/opt/mssql-tools/bin:$PATH
