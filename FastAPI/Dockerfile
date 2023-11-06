FROM python:3.9

WORKDIR /FastAPI

COPY ./requirements.txt /FastAPI/requirements.txt

RUN pip install --upgrade pip

RUN apt-get update

RUN pip install --no-cache-dir --upgrade -r /FastAPI/requirements.txt

COPY ./ /FastAPI

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]