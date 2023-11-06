FROM python:3.9

COPY ./requirements.txt ./requirements.txt

RUN pip install --upgrade pip

RUN apt-get update

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

WORKDIR /FastAPI

COPY ./FastAPI /FastAPI

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]