from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from request.InterviewTypeRequest import InterviewTypeRequest
from service import *

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost",
    "https://k9b107a.p.ssafy.io",
    "https://k9b107.p.ssafy.io",
    "https://silapmyeon.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"hello": "world"}

# 질문 생성
@app.post("/interview")
async def interview_question_create(request: InterviewTypeRequest):
    question = await select_question(request)

    if request.question == "자소서":
        company = await get_company_name(request.resume)
    else:
        company = request.question + " 면접"

    content = {"question": question, "company": company}

    return JSONResponse(content=content, status_code=200)

# exception hanler
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )
