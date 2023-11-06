FROM python:3.9

COPY ./FastAPI/requirements.txt /fastapi/requirements.txt

RUN pip install --upgrade pip

RUN apt-get update

WORKDIR /fastapi

RUN pip install --no-cache-dir --upgrade -r /fastapi/requirements.txt

COPY ./FastAPI /fastapi

RUN ls -al

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]