import random

from models import Resume, User, Base
from request.InterviewTypeRequest import InterviewTypeRequest
from dotenv import load_dotenv
from starlette.config import Config
from sqlalchemy import select, create_engine
from sqlalchemy.orm import sessionmaker
from redis_driver import RedisDriver
import openai

load_dotenv()

config = Config(".env")

openai.api_key = config('CHATGPT_API_KEY')
DB_URL = config('DB_URL_LOCAL')
GPT_MODEL = config('GPT_MODEL')

engine = create_engine(DB_URL, echo=True)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)

session = Session()

redis_instance = RedisDriver()

async def mysql(user_id: int):
    name = "user:type:" + str(user_id)
    result = await redis_instance.get_hash(name)

    user = session.execute(select(User).where(User.user_id == user_id)).scalar()

    if result:
        print(f"type: {result['interview_type']}, gtype: {result['interview_question_type']}, id: {result['resume_id']}")
    print(f"id : {user.resumes[0].resume_id}, com : {user.resumes[0].company_name}, question : {user.resumes[0].resume_items[0].resume_question}")

async def select_question(user_id: int):
    name = "user:type:" + str(user_id)
    result = await redis_instance.get_hash(name)

    if result.get('interview_question_type') == '자소서':
        question = await resume_question(int(result.get('resume_id')))
    elif result.get('interview_question_type') == '기술':
        question = await tech_question()
    elif result.get('interview_question_type') == '인성':
        question = await attitude_question(int(result.get('resume_id')))
    else:
        # redis에 데이터가 없을 때
        question = await tech_question()

    return question


async def attitude_question(resume_id: int):
    company_name = "it"

    if resume_id != 0:
        resume = session.execute(select(Resume).where(Resume.resume_id == resume_id)).scalar()
        company_name = resume.company_name

    prompt = [
        {"role": "system", "content": "당신은 " + company_name + "기업의 it직무 면접관입니다."},
        {"role": "user", "content": "신입 개발자 인성 면접에서 나올 수 있는 질문을 한 가지 해주세요."},
    ]

    chat_completion = openai.ChatCompletion.create(model=GPT_MODEL, messages=prompt)
    print("complete")
    return chat_completion.choices[0].message["content"]

async def tech_question():
    subject = [
        "운영체제",
        "데이터베이스",
        "네트워크",
        "알고리즘과 자료구조",
        "컴퓨터 구조",
        "소프트웨어 공학"
    ]

    subject_num = random.randrange(6)

    prompt = [
        {"role": "system", "content": "당신은 세계 최고의 it기업 면접관입니다. "
                                      "당신은 computer science에 관한 질문을 할 수 있습니다. 면접에서 나올만 한 질문을 해주세요."},
        {"role": "user", "content": "computer science 관련 질문 중 " + subject[subject_num] + "에 대한 자세한 질문을 50자 이내로 해주세요."},
    ]

    chat_completion = openai.ChatCompletion.create(model=GPT_MODEL, messages=prompt)
    print("complete")
    return chat_completion.choices[0].message["content"]

async def resume_question(resume_id: int):
    resume = session.execute(select(Resume).where(Resume.resume_id == resume_id)).scalar()

    contents = ("<문항> " + resume.resume_items[0].resume_question + " <자기소개서> " + resume.resume_items[0].resume_answer)

    prompt = [
        {"role": "system",
         "content": "당신은 " + resume.company_name + "의 디지털/ICT 직무 면접관입니다."
                                                   "해당 자기소개서를 보고 자기소개서 문항에 맞는 키워드에 대해 면접자에게 질문을 한 가지 해주세요."
                                                   "자기소개서 문항은 '<문항>'으로 시작합니다. 자기소개서는 '<자기소개서>'로 시작합니다."
                                                   "'<답변>'으로 시작하는 문장을 받는다면 꼬리질문을 할 수 있습니다."
                                                   "꼬리 질문을 할 만한 답변이 아니라면 자기 소개서에 대해 계속 질문 할 수 있습니다."},
        {"role": "user", "content": contents}
    ]

    print(contents)

    chat_completion = openai.ChatCompletion.create(model=GPT_MODEL, messages=prompt)
    print("complete")
    return chat_completion.choices[0].message["content"]

async def interview_type_save(user_id: int, request: InterviewTypeRequest):
    name: str = "user:type:" + str(user_id)
    mapping = {
        'interview_type': request.interview_type,
        'interview_question_type': request.interview_question_type,
        'resume_id': str(request.resume_id)
    }
    await redis_instance.set_hash(name, mapping, 3600)

async def save_answer(user_id: int, answer: str, question_num: int):
    resume_name: str = "user:type:" + str(user_id)
    result_resume = await redis_instance.get_hash(resume_name)

    name: str = "answer:" + str(result_resume.get('resume_id')) + ":" + str(question_num) + ":" + str(user_id)
    await redis_instance.set_key(name, answer, 3600)

