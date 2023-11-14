import random

from models import Resume, User, Base
from request.InterviewTypeRequest import InterviewTypeRequest
from dotenv import load_dotenv
from starlette.config import Config
from sqlalchemy import select, create_engine
from sqlalchemy.orm import sessionmaker
import openai

load_dotenv()

config = Config(".env")

openai.api_key = config('CHATGPT_API_KEY')
DB_URL = config('DB_URL_PROD')
GPT_MODEL = config('GPT_MODEL')

engine = create_engine(DB_URL, echo=True)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)

session = Session()

async def get_company_name(resume_id: int):
    resume = session.execute(select(Resume).where(Resume.resume_id == resume_id)).scalar()
    company_name = resume.company_name

    return company_name



async def select_question(request : InterviewTypeRequest):

    if request.question == '자소서':
        question = await resume_question(request.resume)
    elif request.question == '기술':
        question = await tech_question()
    elif request.question == '인성':
        question = await attitude_question(request.resume)
    else:
        question = await tech_question()

    return question


async def attitude_question(resume_id: int):
    company_name = "it"

    if resume_id != 0:
        resume = session.execute(select(Resume).where(Resume.resume_id == resume_id)).scalar()
        company_name = resume.company_name

    prompt = [
        {"role": "system", "content": "당신은 " + company_name + "기업의 it직무 면접관입니다."},
        {"role": "user", "content": "신입 개발자 인성 면접에서 나올 수 있는 질문을 다섯 가지 해주세요. 불필요한 단어 없이 질문만 해주세요. 질문은 '#'으로 구분해주세요."},
    ]

    chat_completion = openai.chat.completions.create(model=GPT_MODEL, messages=prompt)
    print("complete")

    qlist = chat_completion.choices[0].message.content.split('#')

    return qlist

async def tech_question():
    subject = [
        "운영체제",
        "데이터베이스",
        "네트워크",
        "알고리즘과 자료구조",
        "컴퓨터 구조",
        "소프트웨어 공학"
    ]
    prompt = [
        {"role": "system", "content": "당신은 세계 최고의 it기업 면접관입니다. "
                                      "당신은 computer science에 관한 질문을 할 수 있습니다. 면접에서 나올만 한 질문을 해주세요."},
        {"role": "user", "content": "computer science 관련 질문 중 운영체제, 데이터베이스, 네트워크, 알고리즘과 자료구조, 컴퓨터 구조, 소프트웨어 공학에 대한 키워드를 무작위로 골라 자세한 질문 총 다섯 가지를 각각 100자 이내로 해주세요."
                                                                                         "질문은 '#'으로 시작하고 분야를 구분하지 말아주세요."},
    ]

    chat_completion = openai.chat.completions.create(model=GPT_MODEL, messages=prompt)
    print("complete")

    return chat_completion.choices[0].message.content.split('#')

async def resume_question(resume_id: int):
    resume = session.execute(select(Resume).where(Resume.resume_id == resume_id)).scalar()

    contents = ""

    for i in range(len(resume.resume_items)):
        contents += ("<문항> " + resume.resume_items[i].resume_question + " <자기소개서> " + resume.resume_items[i].resume_answer)

    prompt = [
        {"role": "system",
         "content": "당신은 " + resume.company_name + "의 디지털/ICT 직무 면접관입니다."
                                                   "해당 자기소개서를 보고 자기소개서 문항에 맞는 키워드에 대해 면접자에게 질문을 다섯 가지 해주세요."
                                                   "자기소개서 문항은 '<문항>'으로 시작합니다. 자기소개서는 '<자기소개서>'로 시작합니다."
                                                   "'<답변>'으로 시작하는 문장을 받는다면 꼬리질문을 할 수 있습니다."
                                                   "꼬리 질문을 할 만한 답변이 아니라면 자기 소개서에 대해 계속 질문 할 수 있습니다."
                                                   "500자 내외로 질문 해주세요. 불필요한 단어 없이 질문만 해주세요."
                                                   "질문은 '#'으로 구분해주세요."},
        {"role": "user", "content": contents}
    ]

    print(contents)

    chat_completion = openai.chat.completions.create(model=GPT_MODEL, messages=prompt)
    print("complete")

    qlist = chat_completion.choices[0].message.content.split('#')

    return qlist

