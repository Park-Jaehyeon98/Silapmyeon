package com.b107.interview.domain.comment.mapper;

import com.b107.interview.domain.comment.dto.CommentRequest;
import com.b107.interview.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "commentContent",source="content")
    Comment commnetRequestToComment(CommentRequest commentRequest);

}
