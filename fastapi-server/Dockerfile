FROM python:3.8-slim-buster

RUN apt-get update && \
    apt-get install -y git build-essential && \
    apt-get clean
RUN pip install poetry

ENV PROJECT_NAME socar-de-onbarding
ENV PROJECT_ROOT /app/${PROJECT_NAME}
ENV SERVER_ROOT ${PROJECT_ROOT}/fastapi-server
ENV PYTHONPATH ${SERVER_ROOT}
ENV PORT=8000

EXPOSE ${PORT}

WORKDIR ${PROJECT_ROOT}
COPY . ${PROJECT_ROOT}

RUN poetry config virtualenvs.create false && \
    poetry install && \
    poetry shell
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
