from pydantic import BaseModel

# 면접 유형 요청 dto
class InterviewTypeRequest(BaseModel):
    interview_type: str
    interview_question_type: str
    resume_id: int
