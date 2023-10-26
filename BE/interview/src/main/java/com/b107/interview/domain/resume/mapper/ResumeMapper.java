package com.b107.interview.domain.resume.mapper;

import com.b107.interview.domain.resume.dto.request.ResumeReqDto;
import com.b107.interview.domain.resume.dto.response.ResumeResDto;
import com.b107.interview.domain.resume.dto.response.ResumeSimpleResDto;
import com.b107.interview.domain.resume.entity.Resume;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ResumeMapper {
    @Mapping(source = "user", target = "user.userId")
    Resume resumeReqDtoToResume(ResumeReqDto resumeReqDto);

    @Mapping(source = "review.reviewId", target = "reviewId")
    ResumeResDto resumeToResumeResDto(Resume resume);

    @Mapping(source = "review.reviewId", target = "reviewId")
    ResumeSimpleResDto resumeToResumeSimpleResDto(Resume resume);
}
