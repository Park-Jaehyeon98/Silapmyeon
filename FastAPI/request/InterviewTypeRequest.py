from pydantic import BaseModel

# 면접 유형 요청 dto
class InterviewTypeRequest(BaseModel):
    type: str
    question: str
    resume: int
