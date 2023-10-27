from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from request.InterviewTypeRequest import InterviewTypeRequest
from request.Answer import Answer
from service import *

app = FastAPI()

@app.get("/")
async def root():
    return {"hello":"world"}

# 면접 유형 등록
@app.post("/interview/{user_id}")
async def interview_request(user_id: int, request: InterviewTypeRequest):
    await interview_type_save(user_id, request)

    return JSONResponse(content={"message": "ok"}, status_code=200)

# 질문 생성
@app.get("/interview/{user_id}")
async def interview_question_create(user_id: int):
    question = await select_question(user_id)
    # await mysql(user_id)
    # question = "11"

    # redis로 유저 아이디를 통해 유형을 가져오고 유형에 따라 다른 함수 실행 자소서 기반 질문에는 resume_id 넣어줌

    content = {"question": question}

    return JSONResponse(content=content, status_code=200)

# 답변 저장
@app.post("/interview/answer/{user_id}")
async def interview_answer_regist(user_id: int, request: Answer):
    await save_answer(user_id, request.answer, request.question_num)
    return JSONResponse(content={"message": "ok"}, status_code=200)

# exception hanler
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )
