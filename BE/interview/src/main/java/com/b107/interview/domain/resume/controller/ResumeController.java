package com.b107.interview.domain.resume.controller;

import com.b107.interview.domain.resume.dto.request.ResumeReqDto;
import com.b107.interview.domain.resume.dto.response.ResumeResDto;
import com.b107.interview.domain.resume.dto.response.ResumeSimpleResDto;
import com.b107.interview.domain.resume.entity.Resume;
import com.b107.interview.domain.resume.mapper.ResumeMapper;
import com.b107.interview.domain.resume.service.ResumeService;
import com.b107.interview.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/resume")
@RequiredArgsConstructor
public class ResumeController {
    private final ResumeService resumeService;
    private final ResumeMapper resumeMapper;

    //자기소개서 작성
    @PostMapping
    public ResponseEntity<?> postResume(@RequestBody ResumeReqDto resumeReqDto) {
        resumeReqDto.setUser(SecurityUtils.getUser().getUserId());
        Resume resume = resumeMapper.resumeReqDtoToResume(resumeReqDto);
        Resume createdResume = resumeService.createResume(resume);
        ResumeResDto resumeResDto = resumeMapper.resumeToResumeResDto(createdResume);
        return new ResponseEntity<>(resumeResDto, HttpStatus.CREATED);
    }

    //자기소개서 수정
    @PutMapping("/{resume-id}")
    public ResponseEntity<?> putResume(@PathVariable("resume-id") Long resumeId, @RequestBody ResumeReqDto resumeReqDto) {
        resumeReqDto.setUser(SecurityUtils.getUser().getUserId());
        Resume resume = resumeMapper.resumeReqDtoToResume(resumeReqDto);
        Resume updatedResume = resumeService.updateResume(resume, resumeId);
        ResumeResDto resumeResDto = resumeMapper.resumeToResumeResDto(updatedResume);
        return new ResponseEntity<>(resumeResDto, HttpStatus.OK);
    }

    //자기소개서 조회
    @GetMapping("/{resume-id}")
    public ResponseEntity<?> getResume(@PathVariable("resume-id") Long resumeId) {
        Resume foundResume = resumeService.readResume(resumeId, SecurityUtils.getUser().getUserId());
        ResumeResDto resumeResDto = resumeMapper.resumeToResumeResDto(foundResume);
        return new ResponseEntity<>(resumeResDto, HttpStatus.OK);
    }

    //자기소개서 전체 조회
    @GetMapping
    public ResponseEntity<?> getResumes(@PageableDefault(sort = "resumeId", direction = Sort.Direction.DESC) Pageable pageable,
                                        @RequestParam(value = "keyword", required = false) String keyword,
                                        @RequestParam(value = "isAll", required = false) boolean flag) {
        Object resumes = resumeService.readResumes(pageable, SecurityUtils.getUser().getUserId(), keyword, flag);
        if (flag) {
            List<Resume> resumeList = (List<Resume>) resumes;
            List<ResumeSimpleResDto> resumeSimpleResDtos = resumeList.stream().map(resume -> resumeMapper.resumeToResumeSimpleResDto(resume)).collect(Collectors.toList());
            return new ResponseEntity<>(resumeSimpleResDtos, HttpStatus.OK);
        } else {
            Page<Resume> resumePage = (Page<Resume>) resumes;
            Page<ResumeSimpleResDto> resumeSimpleResDtos = resumePage.map(resume -> resumeMapper.resumeToResumeSimpleResDto(resume));
            return new ResponseEntity<>(resumeSimpleResDtos, HttpStatus.OK);
        }
    }

    //자기소개서 삭제
    @DeleteMapping("/{resume-id}")
    public ResponseEntity<?> deleteResume(@PathVariable("resume-id") Long resumeId) {
        resumeService.deleteResume(resumeId, SecurityUtils.getUser().getUserId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
