package com.b107.interview.domain.resume.service;

import com.b107.interview.domain.resume.entity.Resume;
import com.b107.interview.domain.resume.entity.ResumeItem;
import com.b107.interview.domain.resume.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ResumeService {
    private final ResumeRepository resumeRepository;

    //자기소개서 작성
    public Resume createResume(Resume resume) {
        List<ResumeItem> resumeItems = new ArrayList<>(resume.getResumeItems());
        resume.getResumeItems().clear();

        Resume createdResume = resumeRepository.save(resume);

        for (int i = 0; i < resumeItems.size(); i++) {
            resumeItems.get(i).setResume(createdResume);
            createdResume.getResumeItems().add(resumeItems.get(i));
        }

        return createdResume;
    }

    //자기소개서 수정
    public Resume updateResume(Resume resume, Long resumeId) {
        Resume foundResume = readResume(resumeId, resume.getUser().getUserId());

        foundResume.setCompanyName(resume.getCompanyName());
        foundResume.setInterviewDate(resume.getInterviewDate());

        List<ResumeItem> resumeItems = new ArrayList<>(resume.getResumeItems());
        resume.getResumeItems().clear();
        foundResume.getResumeItems().clear();

        for (int i = 0; i < resumeItems.size(); i++) {
            resumeItems.get(i).setResume(foundResume);
            foundResume.getResumeItems().add(resumeItems.get(i));
        }

        return foundResume;
    }

    //자기소개서 조회
    public Resume readResume(Long resumeId, Long userId) {
        Optional<Resume> optionalResume = resumeRepository.findById(resumeId);
        if (optionalResume.isEmpty()) {
            throw new RuntimeException("존재하지 않는 자기소개서입니다.");
        }

        Resume resume = optionalResume.get();

        if (!Objects.equals(resume.getUser().getUserId(), userId)) {
            throw new RuntimeException("권한이 없는 사용자입니다.");
        }

        return resume;
    }

    //자기소개서 전체 조회
    public Page<Resume> readResumes(Pageable pageable, Long userId) {
        return resumeRepository.findAllByUserId(pageable, userId);
    }

    //자기소개서 삭제
    public void deleteResume(Long resumeId, Long userId) {
        Resume foundResume = readResume(resumeId, userId);
        resumeRepository.delete(foundResume);
    }
}
