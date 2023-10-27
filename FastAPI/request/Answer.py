from pydantic import BaseModel

class Answer(BaseModel):
    question_num: int
    answer: str