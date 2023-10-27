from typing import List

from sqlalchemy import Boolean, String, ForeignKey
from sqlalchemy.dialects.mysql import TIMESTAMP,BIGINT
from sqlalchemy.orm import relationship, mapped_column, Mapped, DeclarativeBase
import datetime

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "user"

    user_id: Mapped[int] = mapped_column(BIGINT, autoincrement=True, primary_key=True)
    user_nickname: Mapped[str] = mapped_column(String(30), nullable=False)
    user_email: Mapped[str] = mapped_column(String(30), nullable=False)
    user_profile_url: Mapped[str] = mapped_column(String(255), nullable=True)
    resumes: Mapped[List["Resume"]] = relationship(back_populates='user')

class Resume(Base):
    __tablename__ = "resume"

    resume_id: Mapped[int] = mapped_column(BIGINT, autoincrement=True, primary_key=True)
    company_name: Mapped[str] = mapped_column(String(30), nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(TIMESTAMP(), nullable=False)
    has_review: Mapped[bool] = mapped_column(Boolean, nullable=False)
    interview_date: Mapped[datetime.datetime] = mapped_column(TIMESTAMP(), nullable=True)
    modified_time: Mapped[datetime.datetime] = mapped_column(TIMESTAMP(), nullable=True)
    user_id: Mapped[int] = mapped_column(BIGINT, ForeignKey('user.user_id'))
    user: Mapped["User"] = relationship(back_populates='resumes')
    resume_items: Mapped[List["ResumeItem"]] = relationship(back_populates='resume')

class ResumeItem(Base):
    __tablename__ = "resume_item"

    resume_item_id: Mapped[int] = mapped_column(BIGINT, autoincrement=True, primary_key=True)
    resume_question: Mapped[str] = mapped_column(String(255), nullable=False)
    resume_answer: Mapped[str] = mapped_column(String(1500), nullable=False)
    resume_id: Mapped[int] = mapped_column(BIGINT, ForeignKey('resume.resume_id'))
    resume: Mapped["Resume"] = relationship(back_populates='resume_items')
