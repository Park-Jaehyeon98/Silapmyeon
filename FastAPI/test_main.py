from fastapi.testclient import TestClient

from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"hello": "world"}

def test_interview_request():
    response = client.post("/interview/1", json={"interview_type": "연습",
                                                 "interview_question_type": "자소서",
                                                 "resume_id": "1"
                                                 })
    assert response.status_code == 200
    assert response.json() == {"message": "ok"}
