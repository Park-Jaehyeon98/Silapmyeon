FROM python:3.9

COPY ./requirements.txt /FastAPI/requirements.txt

RUN pip install --upgrade pip

RUN apt-get update

WORKDIR /Fas

RUN pip install --no-cache-dir --upgrade -r /FastAPI/requirements.txt

COPY ./FastAPI /FastAPI/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]